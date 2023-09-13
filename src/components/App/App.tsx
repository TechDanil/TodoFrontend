import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskFormPage from '../../pages/TaskFormPage';
import SignupPage from '../../pages/SignupPage';
import LoginPage from '../../pages/LoginPage';
import TasksPage from '../../pages/TasksPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignupPage />} />
                <Route path="/taskForm" element={<TaskFormPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;