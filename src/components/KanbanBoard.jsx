// KanbanBoard.jsx - Simplified with inline styles for testing
import { useState, useEffect } from 'react';

function KanbanBoard() {
  // Default empty board structure
  const defaultBoard = {
    todo: {
      title: 'To Do',
      items: []
    },
    inProgress: {
      title: 'In Progress',
      items: []
    },
    completed: {
      title: 'Completed',
      items: []
    }
  };

  // Load data from localStorage or use default empty board
  const [columns, setColumns] = useState(() => {
    const savedData = localStorage.getItem('kanbanData');
    return savedData ? JSON.parse(savedData) : defaultBoard;
  });
  
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');
  
  // Save to localStorage whenever columns change
  useEffect(() => {
    localStorage.setItem('kanbanData', JSON.stringify(columns));
  }, [columns]);
  
  // Add a new task to the To Do column
  const addTask = () => {
    if (newTask.trim() === '') return;
    
    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        items: [...columns.todo.items, { id: Date.now().toString(), content: newTask }]
      }
    });
    
    setNewTask('');
  };
  
  // Move a task to a different column
  const moveTask = (taskId, sourceColumn, targetColumn) => {
    const task = columns[sourceColumn].items.find(item => item.id === taskId);
    const sourceItems = columns[sourceColumn].items.filter(item => item.id !== taskId);
    const targetItems = [...columns[targetColumn].items, task];
    
    setColumns({
      ...columns,
      [sourceColumn]: {
        ...columns[sourceColumn],
        items: sourceItems
      },
      [targetColumn]: {
        ...columns[targetColumn],
        items: targetItems
      }
    });
  };
  
  // Delete a task
  const deleteTask = (taskId, columnId) => {
    const updatedItems = columns[columnId].items.filter(item => item.id !== taskId);
    
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: updatedItems
      }
    });
  };
  
  // Start editing a task
  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.content);
  };
  
  // Save edited task
  const saveEdit = (taskId, columnId) => {
    if (editText.trim() === '') return;
    
    const updatedItems = columns[columnId].items.map(item => 
      item.id === taskId ? { ...item, content: editText } : item
    );
    
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: updatedItems
      }
    });
    
    setEditingTask(null);
  };

  // Clear the board
  const clearBoard = () => {
    setColumns(defaultBoard);
    localStorage.removeItem('kanbanData');
  };

  // Export data
  const exportData = () => {
    const dataStr = JSON.stringify(columns, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'kanban-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  // Inline styles to ensure columns display side by side
  const styles = {
    container: {
      width: '100%',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    addTaskContainer: {
      display: 'flex',
      marginBottom: '20px',
      maxWidth: '600px',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    input: {
      flex: 1,
      padding: '10px',
      borderRadius: '4px 0 0 4px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    addButton: {
      padding: '10px 20px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '0 4px 4px 0',
      cursor: 'pointer',
    },
    columnsContainer: {
      display: 'flex',
      width: '100%',
      gap: '20px',
      minHeight: '400px',
    },
    column: {
      flex: '1 1 0px', // This is critical - forces equal width columns
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    columnTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '10px 0',
      marginBottom: '15px',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
    tasksContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      overflowY: 'auto',
    },
    taskCard: {
      backgroundColor: 'white',
      borderRadius: '4px',
      padding: '12px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
    taskContent: {
      marginBottom: '10px',
      wordBreak: 'break-word',
    },
    taskActions: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '5px',
    },
    moveButtons: {
      display: 'flex',
      gap: '5px',
      flexWrap: 'wrap',
    },
    editButtons: {
      display: 'flex',
      gap: '5px',
    },
    button: {
      padding: '5px 8px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
    },
    todoButton: {
      backgroundColor: '#e5e7eb',
    },
    progressButton: {
      backgroundColor: '#bfdbfe',
    },
    completeButton: {
      backgroundColor: '#bbf7d0',
    },
    editButton: {
      backgroundColor: '#fef3c7',
    },
    deleteButton: {
      backgroundColor: '#fee2e2',
    },
    editContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    textarea: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      minHeight: '60px',
      fontFamily: 'inherit',
    },
    saveButton: {
      backgroundColor: '#34d399',
      color: 'white',
    },
    cancelButton: {
      backgroundColor: '#9ca3af',
      color: 'white',
    },
    emptyColumn: {
      padding: '15px',
      textAlign: 'center',
      color: '#9ca3af',
      border: '2px dashed #d1d5db',
      borderRadius: '4px',
      backgroundColor: 'white',
    },
    boardActions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '20px',
    },
    clearButton: {
      padding: '8px 16px',
      backgroundColor: '#6b7280',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    exportButton: {
      padding: '8px 16px',
      backgroundColor: '#10b981',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.addTaskContainer}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          style={styles.input}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask} style={styles.addButton}>
          Add
        </button>
      </div>
      
      <div style={styles.columnsContainer}>
        {Object.keys(columns).map(columnId => (
          <div key={columnId} style={styles.column}>
            <h2 style={styles.columnTitle}>
              {columns[columnId].title}
            </h2>
            
            <div style={styles.tasksContainer}>
              {columns[columnId].items.map(task => (
                <div key={task.id} style={styles.taskCard}>
                  {editingTask === task.id ? (
                    <div style={styles.editContainer}>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        style={styles.textarea}
                      />
                      <div style={styles.editButtons}>
                        <button
                          onClick={() => saveEdit(task.id, columnId)}
                          style={{...styles.button, ...styles.saveButton}}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTask(null)}
                          style={{...styles.button, ...styles.cancelButton}}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p style={styles.taskContent}>{task.content}</p>
                      <div style={styles.taskActions}>
                        <div style={styles.moveButtons}>
                          {columnId !== 'todo' && (
                            <button
                              onClick={() => moveTask(task.id, columnId, 'todo')}
                              style={{...styles.button, ...styles.todoButton}}
                            >
                              To Do
                            </button>
                          )}
                          {columnId !== 'inProgress' && (
                            <button
                              onClick={() => moveTask(task.id, columnId, 'inProgress')}
                              style={{...styles.button, ...styles.progressButton}}
                            >
                              In Progress
                            </button>
                          )}
                          {columnId !== 'completed' && (
                            <button
                              onClick={() => moveTask(task.id, columnId, 'completed')}
                              style={{...styles.button, ...styles.completeButton}}
                            >
                              Complete
                            </button>
                          )}
                        </div>
                        <div style={styles.editButtons}>
                          <button
                            onClick={() => startEditing(task)}
                            style={{...styles.button, ...styles.editButton}}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(task.id, columnId)}
                            style={{...styles.button, ...styles.deleteButton}}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
              
              {columns[columnId].items.length === 0 && (
                <div style={styles.emptyColumn}>
                  No tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.boardActions}>
        <button onClick={clearBoard} style={styles.clearButton}>
          Clear Board
        </button>
        <button onClick={exportData} style={styles.exportButton}>
          Export Data
        </button>
      </div>
    </div>
  );
}

export default KanbanBoard;