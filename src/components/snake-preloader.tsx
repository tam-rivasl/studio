
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';

const GRID_SIZE = 20;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const GRID_WIDTH = CANVAS_WIDTH / GRID_SIZE;
const GRID_HEIGHT = CANVAS_HEIGHT / GRID_SIZE;

const TEXT_LINE_1 = "Tamara Rivas";
const TEXT_LINE_2 = "Desarrolladora Back-End";

const FONT_COLOR = "hsl(var(--primary))";
const SNAKE_COLOR = "hsl(var(--foreground))";
const BG_COLOR = "hsl(var(--background))";


// Genera las posiciones de las letras como "comida"
const generateFoodPositions = () => {
  const food = [];
  const y1 = Math.floor(GRID_HEIGHT / 2) - 2;
  const startX1 = Math.floor((GRID_WIDTH - TEXT_LINE_1.length) / 2);
  for (let i = 0; i < TEXT_LINE_1.length; i++) {
    if (TEXT_LINE_1[i] !== ' ') {
      food.push({ x: startX1 + i, y: y1, char: TEXT_LINE_1[i] });
    }
  }

  const y2 = Math.floor(GRID_HEIGHT / 2) + 1;
  const startX2 = Math.floor((GRID_WIDTH - TEXT_LINE_2.length) / 2);
  for (let i = 0; i < TEXT_LINE_2.length; i++) {
     if (TEXT_LINE_2[i] !== ' ') {
      food.push({ x: startX2 + i, y: y2, char: TEXT_LINE_2[i] });
     }
  }
  return food;
};

export const SnakePreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [snake, setSnake] = useState([{ x: 1, y: 1 }]);
  const [food, setFood] = useState(generateFoodPositions);
  const [targetFood, setTargetFood] = useState(food[0]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [progress, setProgress] = useState(0);
  const [isHappy, setIsHappy] = useState(false);
  
  const totalFoodCount = useRef(food.length);

  useEffect(() => {
    if (isHappy) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500); // Espera 1.5s antes de completar
      return () => clearTimeout(timer);
    }
    
    if (food.length === 0 && !isHappy) {
        setIsHappy(true);
        return;
    }

    const gameInterval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        // Simple AI: Mover hacia la comida
        let nextDir = { ...direction };
        if (targetFood){
            if (head.x < targetFood.x) nextDir = { x: 1, y: 0 };
            else if (head.x > targetFood.x) nextDir = { x: -1, y: 0 };
            else if (head.y < targetFood.y) nextDir = { x: 0, y: 1 };
            else if (head.y > targetFood.y) nextDir = { x: 0, y: -1 };
        }
        
        setDirection(nextDir);

        head.x += nextDir.x;
        head.y += nextDir.y;
        
        // Comprobar si come la comida
        let ateFood = false;
        if (targetFood && head.x === targetFood.x && head.y === targetFood.y) {
          ateFood = true;
        }

        newSnake.unshift(head);

        if (ateFood) {
          const remainingFood = food.filter(f => !(f.x === targetFood.x && f.y === targetFood.y));
          setFood(remainingFood);
          if (remainingFood.length > 0) {
            setTargetFood(remainingFood[0]);
          } else {
            setTargetFood(null); // No hay más comida
          }
           const newProgress = ((totalFoodCount.current - remainingFood.length) / totalFoodCount.current) * 100;
           setProgress(newProgress);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 100);

    return () => clearInterval(gameInterval);
  }, [food, targetFood, onComplete, direction, isHappy]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div
        className="relative border-2 border-primary"
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, backgroundColor: BG_COLOR }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className={cn(
                "absolute flex items-center justify-center rounded-full shadow-md",
                 isHappy && "animate-jump-for-joy"
            )}
            style={{
              width: GRID_SIZE,
              height: GRID_SIZE,
              left: segment.x * GRID_SIZE,
              top: segment.y * GRID_SIZE,
              backgroundColor: SNAKE_COLOR,
              zIndex: 10 - index // La cabeza estará por encima
            }}
          >
            {/* Añadir ojos a la cabeza */}
            {index === 0 && (
              <div 
                className="flex font-bold"
                style={{ color: BG_COLOR, lineHeight: 1, gap: isHappy ? 0 : '4px', marginTop: isHappy ? '-4px' : 0 }}
              >
                <span>{isHappy ? '^' : '•'}</span>
                <span>{isHappy ? '^' : '•'}</span>
              </div>
            )}
          </div>
        ))}
        {food.map((f, index) => (
          <div
            key={index}
            className="absolute flex items-center justify-center font-mono font-bold"
            style={{
              width: GRID_SIZE,
              height: GRID_SIZE,
              left: f.x * GRID_SIZE,
              top: f.y * GRID_SIZE,
              color: FONT_COLOR,
              fontSize: GRID_SIZE,
            }}
          >
            {f.char}
          </div>
        ))}
      </div>
       <div className="w-full max-w-lg mt-8">
        <Progress value={progress} className="h-4 rounded-full" />
        <p className="text-center font-mono mt-2 text-sm text-primary">Loading... {Math.round(progress)}%</p>
      </div>
    </div>
  );
};
