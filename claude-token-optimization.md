# Claude Token Optimization Cheat Sheet (Simplified)

## 🧠 What's the problem?

Claude runs out of memory (tokens) when:

1. You paste full HTML files (1000s of tokens)
2. Claude replies with full HTML (adds 1000s more)
3. You keep all this in one growing session

---

## ✅ What to do instead

### 🧱 1. Use smaller sessions
Start a new session per task:
- `contacts-pages`
- `loan-pages`
- `payment-tabs`

Use:
```bash
claude --reset --resume [session-name]
```

---

### 💡 2. Be brief and specific

**Don't:**
Paste full HTML code blocks.

**Do:**
Say:
> “Use the Check tab layout. Change label to ‘Wire Instructions’ and add memo textarea.”

---

### 📋 3. Use a TODO-style task list

```txt
Create these 3 pages using the payment layout:
1. did-not-shop-for.html — default: Net Funded
2. did-shop-for.html — default: Net Funded
3. other-charges.html — Line 04 yellow bg, default: Check
```

Claude will only output differences, saving memory.

---

### 🧾 4. Reference reusable parts

**Instead of repeating:**
```html
<nav>...</nav>
```

**Say:**
> Use the nav/sidebar from template.html.

---

### 🔁 5. Continue a session *only when needed*

Use:
```bash
continue [session-name]
```

Only continue if it's the **same task**.  
New task? → Start a new session.

---

## ✅ Summary: Your New Claude Habits

| Do This                              | Why It Helps               |
|--------------------------------------|----------------------------|
| `--reset --resume [name]`            | Keeps tasks modular        |
| Refer to past components by name     | Saves token space          |
| Say “like X, but Y changes”          | Claude remembers structure |
| Use structured task checklists       | Easier & shorter prompts   |