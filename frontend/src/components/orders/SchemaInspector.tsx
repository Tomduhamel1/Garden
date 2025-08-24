import React, { useState, useMemo } from 'react';
import { useOrderData } from '../../hooks/useOrderData';
import type { OrderData } from '../../types/schema';

interface SchemaNode {
  key: string;
  path: string;
  value: any;
  type: string;
  children?: SchemaNode[];
  isArray?: boolean;
  arrayLength?: number;
}

const SchemaInspector: React.FC = () => {
  const { orderData, loading, handleSave, saving, getValue, handleFieldChange } = useOrderData();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyPopulated, setShowOnlyPopulated] = useState(false);

  const buildSchemaTree = (obj: any, key: string, path: string): SchemaNode => {
    const fullPath = path ? `${path}.${key}` : key;
    const value = obj;
    const type = getValueType(value);
    
    const node: SchemaNode = {
      key,
      path: fullPath,
      value,
      type,
    };

    if (type === 'object' && value !== null) {
      node.children = Object.keys(value).map(childKey => 
        buildSchemaTree(value[childKey], childKey, fullPath)
      );
    } else if (type === 'array') {
      node.isArray = true;
      node.arrayLength = value.length;
      node.children = value.map((item: any, index: number) => 
        buildSchemaTree(item, `[${index}]`, fullPath)
      );
    }

    return node;
  };

  const getValueType = (value: any): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    return typeof value;
  };

  const schemaTree = useMemo(() => {
    if (!orderData) return null;
    return buildSchemaTree(orderData, 'root', '');
  }, [orderData]);

  const toggleNode = (path: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const expandAll = () => {
    if (!schemaTree) return;
    const allPaths = new Set<string>();
    const collectPaths = (node: SchemaNode) => {
      allPaths.add(node.path);
      if (node.children) {
        node.children.forEach(collectPaths);
      }
    };
    collectPaths(schemaTree);
    setExpandedNodes(allPaths);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set(['root']));
  };

  const formatValue = (value: any, type: string): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (type === 'string') return `"${value}"`;
    if (type === 'array') return `Array(${value.length})`;
    if (type === 'object') return `Object(${Object.keys(value).length})`;
    return String(value);
  };

  const getValueColor = (type: string): string => {
    switch (type) {
      case 'string': return 'text-green-400';
      case 'number': return 'text-blue-400';
      case 'boolean': return 'text-orange-400';
      case 'null': return 'text-gray-500';
      case 'array': return 'text-purple-400';
      case 'object': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  const filterNodes = (node: SchemaNode): SchemaNode | null => {
    if (!node) return null;

    // Search filter
    const matchesSearch = !searchQuery || 
      node.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof node.value === 'string' && node.value.toLowerCase().includes(searchQuery.toLowerCase()));

    // Populated filter
    const isPopulated = node.value !== null && 
      node.value !== undefined && 
      node.value !== '' && 
      !(Array.isArray(node.value) && node.value.length === 0) &&
      !(typeof node.value === 'object' && Object.keys(node.value || {}).length === 0);

    const shouldShow = matchesSearch && (!showOnlyPopulated || isPopulated);

    if (node.children) {
      const filteredChildren = node.children
        .map(child => filterNodes(child))
        .filter(child => child !== null) as SchemaNode[];

      if (shouldShow || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren
        };
      }
    } else if (shouldShow) {
      return node;
    }

    return null;
  };

  const renderNode = (node: SchemaNode, level: number = 0): React.ReactNode => {
    const isExpanded = expandedNodes.has(node.path);
    const hasChildren = node.children && node.children.length > 0;
    const indent = level * 20;

    return (
      <div key={node.path} className="group">
        <div 
          className="flex items-center py-1 hover:bg-gray-800 cursor-pointer"
          style={{ paddingLeft: `${indent}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleNode(node.path)}
              className="mr-2 text-gray-400 hover:text-white"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          {!hasChildren && <span className="mr-4"></span>}
          
          <span className="text-blue-300 font-mono text-sm mr-2">
            {node.key}
            {node.isArray && <span className="text-gray-400">[{node.arrayLength}]</span>}
          </span>
          
          <span className="text-gray-400 mr-2">:</span>
          
          <span className="text-gray-500 text-xs mr-2">({node.type})</span>
          
          {!hasChildren && (
            <span className={getValueColor(node.type)}>{formatValue(node.value, node.type)}</span>
          )}
        </div>

        {hasChildren && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <div className="animate-pulse">Loading schema data...</div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <div className="text-red-400">No order data available</div>
      </div>
    );
  }

  const filteredTree = schemaTree ? filterNodes(schemaTree) : null;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Schema Data Inspector</h1>
            <p className="text-gray-400 text-sm">Order ID: {orderData.id || 'Loading...'}</p>
            <p className="text-gray-400 text-sm">Total Fields: 1,150+ schema fields available</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded text-white"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4 mt-4">
          <input
            type="text"
            placeholder="Search fields..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500"
          />
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showOnlyPopulated}
              onChange={(e) => setShowOnlyPopulated(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">Show only populated fields</span>
          </label>
          
          <button onClick={expandAll} className="text-blue-400 hover:text-blue-300 text-sm">
            Expand All
          </button>
          
          <button onClick={collapseAll} className="text-blue-400 hover:text-blue-300 text-sm">
            Collapse All
          </button>
        </div>
      </div>

      {/* Schema Tree */}
      <div className="p-4">
        <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm max-h-screen overflow-y-auto">
          {filteredTree ? renderNode(filteredTree) : (
            <div className="text-gray-400">No matching fields found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemaInspector;