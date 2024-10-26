import React, { useState } from 'react';
import { Clock, Camera, MapPin, Award, AlertTriangle } from 'lucide-react';

const MarshallingDemo = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [currentUser, setCurrentUser] = useState('');
  const [tasks, setTasks] = useState({
    'Pre-Trip': [
      { id: 1, task: 'Vehicle Inspection', done: false, photo: false, location: false, urgent: true },
      { id: 2, task: 'Safety Check', done: false, photo: true, location: true, urgent: false },
    ],
    'Active': [
      { id: 3, task: 'Van Position Check', done: false, photo: true, location: true, urgent: true },
      { id: 4, task: 'Route Assignment', done: false, photo: false, location: true, urgent: false },
    ],
    'Post-Trip': [
      { id: 5, task: 'Final Inspection', done: false, photo: true, location: true, urgent: false },
      { id: 6, task: 'Paperwork Submit', done: false, photo: true, location: false, urgent: true },
    ]
  });
  const [performance] = useState(85);
  const [alerts] = useState(2);

  const LoginScreen = () => (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-center text-gray-900">Marshaller Login</h2>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Enter ID"
          className="w-full p-2 border rounded"
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
        />
        <button
          onClick={() => setCurrentScreen('main')}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );

  const MainScreen = () => (
    <div className="max-w-md mx-auto bg-gray-50 h-[600px] flex flex-col">
      <div className="bg-blue-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">Marshalling Tasks</h1>
            <p className="text-sm">ID: {currentUser}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>08:45:23</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>{performance}%</span>
            </div>
          </div>
        </div>
      </div>

      {alerts > 0 && (
        <div className="bg-red-100 p-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span className="text-red-600 text-sm">
            {alerts} tasks require immediate attention
          </span>
        </div>
      )}

      <div className="flex-1 overflow-auto p-4">
        {Object.entries(tasks).map(([category, categoryTasks]) => (
          <div key={category} className="mb-6">
            <h2 className="text-lg font-semibold mb-3">{category}</h2>
            <div className="space-y-3">
              {categoryTasks.map(task => (
                <div key={task.id} className={`bg-white p-3 rounded-lg shadow-sm border-l-4 ${task.urgent ? 'border-red-500' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => {
                          const newTasks = {...tasks};
                          const taskToUpdate = newTasks[category].find(t => t.id === task.id);
                          taskToUpdate.done = !taskToUpdate.done;
                          setTasks(newTasks);
                        }}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className={task.done ? 'line-through text-gray-400' : 'text-gray-700'}>
                        {task.task}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {task.photo && (
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Camera className="w-5 h-5 text-gray-500" />
                        </button>
                      )}
                      {task.location && (
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MapPin className="w-5 h-5 text-gray-500" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-t p-3 flex justify-around">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setCurrentScreen('login')}>
          End Shift
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {currentScreen === 'login' ? <LoginScreen /> : <MainScreen />}
    </div>
  );
};

export default MarshallingDemo;