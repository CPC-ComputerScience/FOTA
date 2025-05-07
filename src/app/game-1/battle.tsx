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
    const [turn, setTurn] = useState<'player' | 'enemy'>('player');
    const [gameOver, setGameOver] = useState(false);

    const [playerHurt, setPlayerHurt] = useState(false);
    const [enemyHurt, setEnemyHurt] = useState(false);
    const [isPowerBarActive, setIsPowerBarActive] = useState(false);
    const [cursorX, setCursorX] = useState(0);
    const [direction, setDirection] = useState(1);

    const [code, setCode] = useState<string | null>(null);


    const handleAttack = () => {
        if (turn !== 'player' || gameOver) return;

        const damage = player.attack;
        const newEnemyHp = Math.max(0, enemy.hp - damage);
        setEnemy({ ...enemy, hp: newEnemyHp });
        setLog((prev) => [`🧨 ${player.name} attacks for ${damage} damage!`, ...prev]);

        setEnemyHurt(true);
        setTimeout(() => setEnemyHurt(false), 300);

        if (newEnemyHp === 0) {
            setLog((prev) => ['✅ Enemy defeated!', ...prev]);
            setGameOver(true);
        } else {
            setTurn('enemy');
            setTimeout(enemyTurn, 1000);
        }
    };
    useEffect(() => {
        if (!isPowerBarActive) return;
        const interval = setInterval(() => {
            setCursorX((prev) => {
                const next = prev + direction * 2;
                if (next >= 100 || next <= 0) setDirection((d) => -d);
                return Math.max(0, Math.min(100, next));
            });
        }, 10);

        return () => clearInterval(interval);
    }, [isPowerBarActive, direction]);


    const enemyTurn = () => {
        const damage = enemy.attack;
        const newPlayerHp = Math.max(0, player.hp - damage);
        setPlayer({ ...player, hp: newPlayerHp });
        setLog((prev) => [`💥 ${enemy.name} attacks for ${damage} damage!`, ...prev]);

        setPlayerHurt(true);
        setTimeout(() => setPlayerHurt(false), 300);

        if (newPlayerHp === 0) {
            setLog((prev) => ['❌ You were defeated...', ...prev]);
            setGameOver(true);
        } else {
            setTurn('player');
        }
    };

    return (
        <div className="battle-container">
            <div className="battle-box">
                <h1 style={{ textAlign: 'center', color: 'gold' }}>⚔️ Mini Battle</h1>
                <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
                    {/* Enemy */}
                    <div className="character">
                        <img
                            src={enemyHurt ? '/K_hurt.png' : '/K.jpg'}
                            alt="Enemy"
                        />
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
                        <img
                            src={playerHurt ? '/G_hurt.png' : '/G.jpg'}
                            alt="Player"
                            style={{ transform: 'scaleX(-1)' }}
                        />
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
                
                        const damage = Math.round(player.attack * power);
                        const newEnemyHp = Math.max(0, enemy.hp - damage);
                        setEnemy({ ...enemy, hp: newEnemyHp });
                        setLog((prev) => [`🧨 You hit for ${damage} damage!`, ...prev]);
                
                        setEnemyHurt(true);
                        setTimeout(() => setEnemyHurt(false), 300);
                
                        if (newEnemyHp === 0) {
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


                <div className="battle-log">
                    <strong>Battle Log:</strong>
                    <ul style={{ paddingLeft: '16px', marginTop: '4px' }}>
                        {log.map((entry, i) => (
                            <li key={i}>• {entry}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}