/* ═══════════════════════════════════════════════════════════════
   Goals Calendar — Logic & State Management
   Interactive calendar with daily tasks, progress tracking
   All data persisted in localStorage
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── State ─────────────────────────────────────────────────────
  const STORAGE_KEY = 'portfolio_goals';
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  let selectedDate = formatDateKey(currentDate);
  let goals = loadGoals();

  function formatDateKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function loadGoals() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch { return {}; }
  }

  function saveGoals() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }

  // ── Calendar Rendering ────────────────────────────────────────
  function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const monthLabel = document.getElementById('calendar-month');
    if (!grid || !monthLabel) return;

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    monthLabel.textContent = `${months[currentMonth]} ${currentYear}`;

    // Day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let html = days.map(d => `<div class="cal-day-header">${d}</div>`).join('');

    // First day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const todayKey = formatDateKey(new Date());

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="cal-cell cal-empty"></div>`;
    }

    // Day cells
    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      const key = formatDateKey(dateObj);
      const dayGoals = goals[key] || [];
      const total = dayGoals.length;
      const done = dayGoals.filter(g => g.done).length;
      const isToday = key === todayKey;
      const isSelected = key === selectedDate;

      let statusClass = '';
      if (total > 0 && done === total) statusClass = 'cal-complete';
      else if (total > 0 && done > 0) statusClass = 'cal-partial';
      else if (total > 0) statusClass = 'cal-pending';

      html += `
        <div class="cal-cell ${statusClass} ${isToday ? 'cal-today' : ''} ${isSelected ? 'cal-selected' : ''}"
             data-date="${key}" onclick="GoalsApp.selectDate('${key}')">
          <span class="cal-num">${d}</span>
          ${total > 0 ? `<span class="cal-dot-row">${done}/${total}</span>` : ''}
        </div>`;
    }

    grid.innerHTML = html;
    renderTasks();
    renderStats();
  }

  // ── Task List Rendering ───────────────────────────────────────
  function renderTasks() {
    const list = document.getElementById('task-list');
    const dateLabel = document.getElementById('selected-date-label');
    if (!list || !dateLabel) return;

    const d = new Date(selectedDate + 'T12:00:00');
    dateLabel.textContent = d.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });

    const dayGoals = goals[selectedDate] || [];

    if (dayGoals.length === 0) {
      list.innerHTML = `
        <div class="task-empty">
          <div class="task-empty-icon">📋</div>
          <p>No goals for this day yet.</p>
          <p style="font-size:13px;color:var(--text-muted)">Add a goal below to start tracking!</p>
        </div>`;
      return;
    }

    list.innerHTML = dayGoals.map((g, i) => `
      <div class="task-item ${g.done ? 'task-done' : ''}" data-index="${i}">
        <button class="task-check ${g.done ? 'checked' : ''}" onclick="GoalsApp.toggleTask(${i})" aria-label="${g.done ? 'Mark incomplete' : 'Mark complete'}">
          ${g.done ? '✓' : ''}
        </button>
        <div class="task-content">
          <span class="task-text">${escapeHTML(g.text)}</span>
          ${g.priority ? `<span class="task-priority task-priority-${g.priority}">${g.priority}</span>` : ''}
        </div>
        <button class="task-delete" onclick="GoalsApp.deleteTask(${i})" aria-label="Delete task">×</button>
      </div>
    `).join('');
  }

  // ── Progress Stats ────────────────────────────────────────────
  function renderStats() {
    const statsEl = document.getElementById('goal-stats');
    if (!statsEl) return;

    // Monthly stats
    let monthTotal = 0, monthDone = 0;
    for (let d = 1; d <= 31; d++) {
      const key = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayGoals = goals[key] || [];
      monthTotal += dayGoals.length;
      monthDone += dayGoals.filter(g => g.done).length;
    }

    // All-time stats
    let allTotal = 0, allDone = 0;
    Object.values(goals).forEach(dayGoals => {
      allTotal += dayGoals.length;
      allDone += dayGoals.filter(g => g.done).length;
    });

    // Current streak (consecutive days with all tasks complete, ending today or yesterday)
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const key = formatDateKey(checkDate);
      const dayGoals = goals[key] || [];
      if (dayGoals.length > 0 && dayGoals.every(g => g.done)) {
        streak++;
      } else if (dayGoals.length > 0) {
        break;
      } else if (i > 0) {
        // Skip days with no goals
        continue;
      }
    }

    const monthPct = monthTotal > 0 ? Math.round((monthDone / monthTotal) * 100) : 0;
    const allPct = allTotal > 0 ? Math.round((allDone / allTotal) * 100) : 0;

    statsEl.innerHTML = `
      <div class="stat-card fade-in visible">
        <div class="stat-value">${streak}</div>
        <div class="stat-label">Day Streak 🔥</div>
      </div>
      <div class="stat-card fade-in visible">
        <div class="stat-value">${monthDone}<span class="stat-total">/${monthTotal}</span></div>
        <div class="stat-label">This Month</div>
        <div class="stat-bar"><div class="stat-fill" style="width:${monthPct}%"></div></div>
      </div>
      <div class="stat-card fade-in visible">
        <div class="stat-value">${allDone}<span class="stat-total">/${allTotal}</span></div>
        <div class="stat-label">All Time</div>
        <div class="stat-bar"><div class="stat-fill" style="width:${allPct}%"></div></div>
      </div>
      <div class="stat-card fade-in visible">
        <div class="stat-value">${monthPct}%</div>
        <div class="stat-label">Monthly Rate</div>
      </div>
    `;
  }

  // ── Task CRUD ─────────────────────────────────────────────────
  function addTask(text, priority) {
    if (!text.trim()) return;
    if (!goals[selectedDate]) goals[selectedDate] = [];
    goals[selectedDate].push({ text: text.trim(), done: false, priority: priority || 'medium', created: Date.now() });
    saveGoals();
    renderCalendar();
  }

  function toggleTask(index) {
    if (goals[selectedDate] && goals[selectedDate][index] !== undefined) {
      goals[selectedDate][index].done = !goals[selectedDate][index].done;
      saveGoals();
      renderCalendar();
    }
  }

  function deleteTask(index) {
    if (goals[selectedDate]) {
      goals[selectedDate].splice(index, 1);
      if (goals[selectedDate].length === 0) delete goals[selectedDate];
      saveGoals();
      renderCalendar();
    }
  }

  function selectDate(key) {
    selectedDate = key;
    renderCalendar();
  }

  function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  }

  function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  }

  function goToToday() {
    const now = new Date();
    currentYear = now.getFullYear();
    currentMonth = now.getMonth();
    selectedDate = formatDateKey(now);
    renderCalendar();
  }

  // ── Helpers ───────────────────────────────────────────────────
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Setup Form ────────────────────────────────────────────────
  function setupForm() {
    const form = document.getElementById('add-task-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('task-input');
      const priority = document.getElementById('task-priority');
      addTask(input.value, priority.value);
      input.value = '';
      input.focus();
    });
  }

  // ── Init ──────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    setupForm();
    renderCalendar();
  });

  // ── Public API ────────────────────────────────────────────────
  window.GoalsApp = {
    selectDate,
    toggleTask,
    deleteTask,
    prevMonth,
    nextMonth,
    goToToday
  };

})();
