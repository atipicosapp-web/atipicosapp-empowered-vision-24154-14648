import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Minimize2, Maximize2 } from 'lucide-react';

interface LibrasAvatarProps {
  isVisible: boolean;
  currentText?: string;
  className?: string;
}

const LibrasAvatar = ({ isVisible, currentText, className = '' }: LibrasAvatarProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Aqui seria a integração com VLibras ou Hand Talk
    if (isVisible && isEnabled && currentText) {
      // Simulação de interpretação em Libras
      console.log('Interpretando em Libras:', currentText);
      
      // Integração futura com VLibras:
      // window.VLibras?.interpreter?.interpret(currentText);
    }
  }, [currentText, isVisible, isEnabled]);

  if (!isVisible || !isEnabled) return null;

  return (
    <Card className={`fixed bottom-4 right-4 z-50 bg-blue-900 border-2 border-blue-400 ${
      isMinimized ? 'w-16 h-16' : 'w-64 h-48'
    } transition-all duration-300 ${className}`}>
      <div className="relative w-full h-full">
        {/* Controles */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <Button
            onClick={() => setIsMinimized(!isMinimized)}
            className="bg-blue-600 hover:bg-blue-500 p-1 rounded"
            size="sm"
          >
            {isMinimized ? (
              <Maximize2 className="w-3 h-3 text-white" />
            ) : (
              <Minimize2 className="w-3 h-3 text-white" />
            )}
          </Button>
          <Button
            onClick={() => setIsEnabled(false)}
            className="bg-red-600 hover:bg-red-500 p-1 rounded"
            size="sm"
          >
            <VolumeX className="w-3 h-3 text-white" />
          </Button>
        </div>

        {!isMinimized && (
          <div className="p-4 pt-8">
            {/* Avatar Virtual de Libras */}
            <div className="w-full h-32 bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-2xl">🤟</span>
                </div>
                <p className="text-xs text-white">
                  Intérprete Virtual
                </p>
              </div>
            </div>
            
            {/* Texto sendo interpretado */}
            {currentText && (
              <div className="mt-2 p-2 bg-blue-800 rounded text-xs text-white">
                {currentText.length > 50 ? `${currentText.substring(0, 50)}...` : currentText}
              </div>
            )}
          </div>
        )}

        {isMinimized && (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-2xl">🤟</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LibrasAvatar;