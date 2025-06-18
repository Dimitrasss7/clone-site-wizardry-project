import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, Check } from 'lucide-react';

interface FormData {
  workSchedule: string;
  age: string;
  proximity: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'home' | 'schedule' | 'age' | 'proximity' | 'success'>('home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    workSchedule: '',
    age: '',
    proximity: ''
  });

  const handleStartWork = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep('schedule');
      setIsAnimating(false);
    }, 400);
  };

  const handleNext = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep === 'schedule') {
        setCurrentStep('age');
      } else if (currentStep === 'age') {
        setCurrentStep('proximity');
      } else if (currentStep === 'proximity') {
        setCurrentStep('success');
      }
      setIsAnimating(false);
    }, 400);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep === 'schedule') {
        setCurrentStep('home');
      } else if (currentStep === 'age') {
        setCurrentStep('schedule');
      } else if (currentStep === 'proximity') {
        setCurrentStep('age');
      } else if (currentStep === 'success') {
        setCurrentStep('home');
      }
      setIsAnimating(false);
    }, 400);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep('home');
      setFormData({
        workSchedule: '',
        age: '',
        proximity: ''
      });
      setIsAnimating(false);
    }, 400);
  };

  const getProgressPercentage = () => {
    switch (currentStep) {
      case 'schedule':
        return '0%';
      case 'age':
        return '33%';
      case 'proximity':
        return '66%';
      case 'success':
        return '100%';
      default:
        return '0%';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-roboto">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000" 
        style={{
          backgroundImage: `url('https://sun9-5.userapi.com/c857232/v857232880/1384a0/Pgv8UeB8KJ4.jpg')`,
          transform: currentStep !== 'home' ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Home Screen */}
      {currentStep === 'home' && (
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="pt-8 px-6 text-center animate-slide-down">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center">
                <img 
                  src="/lovable-uploads/92e9be99-89b3-4bff-a719-5ee5756f425f.png" 
                  alt="Logo" 
                  className="w-10 h-10 object-contain" 
                />
              </div>
              <h1 className="text-white font-medium tracking-wider text-5xl">ARBAT NT</h1>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center max-w-4xl animate-slide-up">
              <h2 className="text-white text-5xl font-bold mb-6 leading-tight md:text-8xl mx-0">
                Начни свой карьерный путь с нами!
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-3xl leading-relaxed font-normal md:text-xl my-[40px] py-0 px-0 mx-[67px]">
                Гибкие условия, стабильная зарплата и поддержка на каждом шагу – твой шанс изменить жизнь<br />
                Мы 8 лет помогаем людям обрести стабильность через работу с надёжными работодателями.
              </p>
              <button 
                onClick={handleStartWork}
                className="bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Начать работать!
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className="pb-6 px-6 text-center animate-slide-up">
            <p className="text-white/60 text-sm">
              © 2024 Arbat-NT. ИП Егтеев Андрей Владимирович, Московская обл., г. Остроган, ул. Подмосковная, д. 23, 140125
            </p>
          </footer>
        </div>
      )}

      {/* Modal Overlay for Steps */}
      {currentStep !== 'home' && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isAnimating ? 'm_modal animation-backwards' : 'm_modal animation-forwards'}`}>
          <div 
            className="modal-data absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{
              backgroundImage: `url('https://i.ytimg.com/vi/n5EsSmHHDZg/maxresdefault.jpg')`
            }} 
            onClick={handleClose}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          </div>
          
          <div className="modal-content relative w-full max-w-2xl h-full flex flex-col">
            {/* Progress Bar */}
            {currentStep !== 'success' && (
              <div className="absolute top-8 left-8 flex items-center gap-2">
                <div className="bg-white rounded px-3 py-1">
                  <span className="text-black text-sm font-medium">{getProgressPercentage()}</span>
                </div>
                <div className="w-64 h-1 bg-gray-400 rounded overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-500" 
                    style={{ width: getProgressPercentage() }}
                  ></div>
                </div>
              </div>
            )}

            {/* Close Button */}
            <button 
              onClick={handleClose} 
              className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Content Area */}
            <div className="flex-1 flex flex-col justify-center px-8">
              {/* Work Schedule Step */}
              {currentStep === 'schedule' && (
                <div className="animate-slide-up">
                  <h3 className="text-white text-3xl font-bold mb-12 text-left leading-tight">
                    Какой график работы вам<br />
                    предпочтительнее?
                  </h3>
                  <div className="space-y-6">
                    <label className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="schedule" 
                          value="flexible" 
                          className="w-6 h-6 opacity-0 absolute"
                          onChange={(e) => setFormData(prev => ({ ...prev, workSchedule: e.target.value }))}
                        />
                        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          {formData.workSchedule === 'flexible' && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-white text-xl">Гибкий график на выбор</span>
                    </label>
                    
                    <label className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="schedule" 
                          value="fulltime" 
                          className="w-6 h-6 opacity-0 absolute"
                          onChange={(e) => setFormData(prev => ({ ...prev, workSchedule: e.target.value }))}
                        />
                        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          {formData.workSchedule === 'fulltime' && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-white text-xl">Полный рабочий день</span>
                    </label>
                    
                    <label className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="schedule" 
                          value="any" 
                          className="w-6 h-6 opacity-0 absolute"
                          onChange={(e) => setFormData(prev => ({ ...prev, workSchedule: e.target.value }))}
                        />
                        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          {formData.workSchedule === 'any' && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-white text-xl">Всё равно</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Age Step */}
              {currentStep === 'age' && (
                <div className="animate-slide-up">
                  <h3 className="text-white text-3xl font-bold mb-12 text-left">
                    Сколько вам лет?
                  </h3>
                  <div className="space-y-6">
                    <label className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="age" 
                          value="under25" 
                          className="w-6 h-6 opacity-0 absolute"
                          onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                        />
                        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          {formData.age === 'under25' && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-white text-xl">До 25</span>
                    </label>
                    
                    <label className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="age" 
                          value="25to40" 
                          className="w-6 h-6 opacity-0 absolute"
                          onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                        />
                        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          {formData.age === '25to40' && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-white text-xl">От 25 до 40</span>
                    </label>
                    
                    <label className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="age" 
                          value="40to55" 
                          className="w-6 h-6 opacity-0 absolute"
                          onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                        />
                        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          {formData.age === '40to55' && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-white text-xl">От 40 до 55</span>
                    </label>
                    
                    <label className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="age" 
                          value="over55" 
                          className="w-6 h-6 opacity-0 absolute"
                          onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                        />
                        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          {formData.age === 'over55' && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-white text-xl">Выше 55</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Proximity Step */}
              {currentStep === 'proximity' && (
                <div className="animate-slide-up">
                  <h3 className="text-white text-3xl font-bold mb-12 text-left leading-tight">
                    Важна ли вам близость<br />
                    работы к дому?
                  </h3>
                  <div className="space-y-6">
                    <label className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="proximity" 
                          value="not-important" 
                          className="w-6 h-6 opacity-0 absolute"
                          onChange={(e) => setFormData(prev => ({ ...prev, proximity: e.target.value }))}
                        />
                        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          {formData.proximity === 'not-important' && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-white text-xl">Неважно, ради хорошей работы готов ездить</span>
                    </label>
                    
                    <label className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="proximity" 
                          value="within-hour" 
                          className="w-6 h-6 opacity-0 absolute"
                          onChange={(e) => setFormData(prev => ({ ...prev, proximity: e.target.value }))}
                        />
                        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          {formData.proximity === 'within-hour' && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-white text-xl">Хотелось бы в пределах часа езды</span>
                    </label>
                    
                    <label className="flex items-center space-x-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="radio" 
                          name="proximity" 
                          value="close-to-home" 
                          className="w-6 h-6 opacity-0 absolute"
                          onChange={(e) => setFormData(prev => ({ ...prev, proximity: e.target.value }))}
                        />
                        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          {formData.proximity === 'close-to-home' && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <span className="text-white text-xl">Чем ближе к дому, тем лучше</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Success Step */}
              {currentStep === 'success' && (
                <div className="text-center animate-zoom-in">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-gray-800" />
                  </div>
                  <h3 className="text-white text-3xl font-bold mb-4">Работа есть!</h3>
                  <p className="text-white/90 text-xl mb-8">
                    Напиши нашему менеджеру по кнопке ниже для начала работы
                  </p>
                  <button 
                    onClick={handleClose}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Нажимай для начала работы
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            {currentStep !== 'success' && (
              <div className="flex justify-between items-center p-8">
                <button 
                  onClick={handleBack} 
                  className="flex items-center justify-center w-12 h-12 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <div className="flex-1 flex justify-center">
                  <span className="text-white/60 text-sm">или нажмите Enter</span>
                </div>
                <button 
                  onClick={() => handleNext(
                    currentStep === 'schedule' ? 'workSchedule' : 
                    currentStep === 'age' ? 'age' : 'proximity',
                    formData[currentStep === 'schedule' ? 'workSchedule' : 
                            currentStep === 'age' ? 'age' : 'proximity']
                  )}
                  disabled={!formData[currentStep === 'schedule' ? 'workSchedule' : 
                                   currentStep === 'age' ? 'age' : 'proximity']}
                  className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  Далее
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
