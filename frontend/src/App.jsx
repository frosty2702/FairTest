import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatorDashboard from './pages/creator/CreatorDashboard';
import CreateExam from './pages/creator/CreateExam';
import StudentDashboard from './pages/student/StudentDashboard';
import BrowseExams from './pages/student/BrowseExams';
import TakeExam from './pages/student/TakeExam';
import ViewResults from './pages/student/ViewResults';
import EvaluatorDashboard from './pages/evaluator/EvaluatorDashboard';

function App() {
    const [wallet, setWallet] = useState(null);

    const connectWallet = () => {
        setWallet('0x' + Math.random().toString(16).substr(2, 40));
    };

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
                    <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>FairTest</Link>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <Link to="/creator">Creator</Link>
                        <Link to="/student">Student</Link>
                        <Link to="/evaluator">Evaluator</Link>
                        <button onClick={connectWallet} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
                            {wallet ? `${wallet.substring(0, 6)}...${wallet.substring(38)}` : 'Connect Wallet'}
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container" style={{ marginTop: '2rem' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/creator" element={<CreatorDashboard />} />
                    <Route path="/creator/create" element={<CreateExam />} />
                    <Route path="/student" element={<StudentDashboard />} />
                    <Route path="/student/browse" element={<BrowseExams />} />
                    <Route path="/student/take/:examId" element={<TakeExam />} />
                    <Route path="/student/results" element={<ViewResults />} />
                    <Route path="/evaluator" element={<EvaluatorDashboard />} />
                </Routes>
            </main>

            <footer style={{ marginTop: '4rem', borderTop: '1px solid var(--border)', padding: '2rem 0', textAlign: 'center', color: var('--text-muted') }}>
                <p>&copy; 2024 FairTest Protocol. Powered by Yellow, Sui, and ENS.</p>
            </footer>
        </div>
    );
}

export default App;
