'use client';

import { useState, useEffect } from 'react';
import './styles/battle.css';
import { Character } from './data';
import PowerBar from './powerbar';

const initialPlayer: Character = {
    name: 'Mr. G',
    hp: 100,
    maxHp: 100,
    attack: 20,
};

const initialEnemy: Character = {
    name: 'Dr. K',
    hp: 80,
    maxHp: 80,
    attack: 15,
};

export default function Battle() {
    const [player, setPlayer] = useState(initialPlayer);
    const [enemy, setEnemy] = useState(initialEnemy);
    const [log, setLog] = useState<string[]>([]);
    const [turn, setTurn] = useState<'player' | 'enemy' | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const [playerHurt, setPlayerHurt] = useState(false);
    const [enemyHurt, setEnemyHurt] = useState(false);
    const [code, setCode] = useState<string | null>(null);
    const [playerDead, setPlayerDead] = useState(false);
    const [enemyDead, setEnemyDead] = useState(false);



    // Enemy AI with chance to defend
    const enemyTurn = () => {
        if (gameOver) return;

        const action = Math.random() < 0.3 ? 'heal' : 'attack'; // 30% chance to heal

        setTimeout(() => {
            if (action === 'attack') {
                const damage = enemy.attack;
                const newPlayerHp = Math.max(0, player.hp - damage);
                setPlayer({ ...player, hp: newPlayerHp });
                setLog((prev) => [`💥 ${enemy.name} attacks for ${damage} damage!`, ...prev]);

                setPlayerHurt(true);
                setTimeout(() => setPlayerHurt(false), 300);

                if (newPlayerHp === 0) {
                    setPlayerDead(true);
                    setLog((prev) => ['❌ You were defeated...', ...prev]);
                    setGameOver(true);
                } else {
                    setTimeout(() => setTurn('player'), 800);
                }
            } else {
                const healAmount = Math.floor(Math.random() * 11) + 5; // heal 5–15
                const newEnemyHp = Math.min(enemy.maxHp, enemy.hp + healAmount);
                setEnemy({ ...enemy, hp: newEnemyHp });
                setLog((prev) => [`💚 ${enemy.name} healed for ${healAmount} HP!`, ...prev]);
                setTimeout(() => setTurn('player'), 800);
            }
        }, 800);
    };


    const handleStart = () => {
        setGameStarted(true);
        setTurn('player');
        setPlayer(initialPlayer);
        setEnemy(initialEnemy);
        setLog([]);
        setCode(null);
        setGameOver(false);
    };

    return (
        <div className="battle-container">
            <div className="battle-box">
                <h1 style={{ textAlign: 'center', color: 'gold' }}>⚔️ Mini Battle</h1>

                {!gameStarted ? (
                    <div style={{ textAlign: 'center' }}>
                        <button className="start-btn" onClick={handleStart}>Start Battle</button>
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
                            {/* Enemy */}
                            <div className="character">
                                <div className={enemyDead ? 'blood-explosion' : ''}>
                                    <img
                                        src={enemyHurt ? '/K_hurt.png' : '/K.jpg'}
                                        alt="Enemy"
                                        className={`${enemyHurt ? 'shake' : ''} ${enemy.hp === 0 ? 'fade-out' : ''}`}
                                    />

                                </div>
                                <div className="hp-bar-bg">
                                    <div
                                        className="hp-bar"
                                        style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
                                    />
                                </div>
                                <p style={{ color: 'lightcoral', fontWeight: 'bold' }}>{enemy.name}</p>
                            </div>

                            {/* Player */}
                            <div className="character">
                                <div className={playerDead ? 'blood-explosion' : ''}>
                                    <img
                                        src={playerHurt ? '/G_hurt.png' : '/G.jpg'}
                                        alt="Player"
                                        className={`${playerHurt ? 'shake' : ''} ${player.hp === 0 ? 'fade-out' : ''}`}
                                        style={{ transform: 'scaleX(-1)' }}
                                    />

                                </div>
                                <div className="hp-bar-bg">
                                    <div
                                        className="hp-bar"
                                        style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                                    />
                                </div>
                                <p style={{ color: 'lightgreen', fontWeight: 'bold' }}>{player.name}</p>
                            </div>

                        </div>

                        <PowerBar
                            isActive={turn === 'player' && !gameOver}
                            onAttack={(power) => {
                                if (turn !== 'player' || gameOver) return;

                                const enemyIsDefending = Math.random() < 0.2;
                                if (enemyIsDefending) {
                                    setLog((prev) => [`🛡️ ${enemy.name} blocked your hit!`, ...prev]);
                                    setTurn('enemy');
                                    setTimeout(enemyTurn, 1000);
                                    return;
                                }

                                const damage = Math.round(player.attack * power);
                                const newEnemyHp = Math.max(0, enemy.hp - damage);
                                setEnemy({ ...enemy, hp: newEnemyHp });
                                setLog((prev) => [`🧨 You hit for ${damage} damage!`, ...prev]);

                                setEnemyHurt(true);
                                setTimeout(() => setEnemyHurt(false), 300);

                                if (newEnemyHp === 0) {
                                    setEnemyDead(true);
                                    setLog((prev) => ['✅ Enemy defeated!', ...prev]);
                                    setCode('8673');
                                    setGameOver(true);
                                } else {
                                    setTurn('enemy');
                                    setTimeout(enemyTurn, 1000);
                                }
                            }}
                        />

                        {gameOver && code && (
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <h2 style={{ color: 'green' }}>You won!</h2>
                                <p>Your 4-digit code: <strong>{code}</strong></p>
                            </div>
                        )}

                        {gameOver && !code && (
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <h2 style={{ color: 'red' }}>You Lose!</h2>
                            </div>
                        )}

                        <div className="battle-log">
                            <strong>Battle Log:</strong>
                            <ul style={{ paddingLeft: '16px', marginTop: '4px' }}>
                                {log.map((entry, i) => (
                                    <li key={i}>• {entry}</li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
