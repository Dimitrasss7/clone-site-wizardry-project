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
  return <div className="min-h-screen relative overflow-hidden font-roboto">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000" style={{
      backgroundImage: `url('https://sun9-5.userapi.com/c857232/v857232880/1384a0/Pgv8UeB8KJ4.jpg')`,
      transform: currentStep !== 'home' ? 'scale(1.05)' : 'scale(1)'
    }}>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Home Screen */}
      {currentStep === 'home' && <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="pt-8 px-6 text-center animate-slide-down">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <div className="text-xs font-bold text-gray-800">NT</div>
                </div>
              </div>
              <h1 className="text-white font-medium tracking-wider text-5xl">ARBAT NT</h1>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center max-w-4xl animate-slide-up">
              <h2 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Начни свой карьерный путь с нами!
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed font-light">
                Гибкие условия, стабильная зарплата и поддержка на каждом шагу – твой шанс изменить жизнь<br />
                Мы 8 лет помогаем людям обрести стабильность через работу с надёжными работодателями.
              </p>
              <button onClick={handleStartWork} className="bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
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
        </div>}

      {/* Modal Overlay for Steps */}
      {currentStep !== 'home' && <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isAnimating ? 'm_modal animation-backwards' : 'm_modal animation-forwards'}`}>
          <div className="modal-data absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url('https://i.ytimg.com/vi/n5EsSmHHDZg/maxresdefault.jpg')`
      }} onClick={handleClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          </div>
          
          <div className="modal-content relative bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
            {/* Progress Bar */}
            {currentStep !== 'success' && <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-2xl overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500" style={{
            width: getProgressPercentage()
          }}></div>
              </div>}

            {/* Close Button */}
            <button onClick={handleClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Work Schedule Step */}
            {currentStep === 'schedule' && <div className="pt-4 animate-slide-up">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                  Какой график работы вам предпочтительнее?
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="radio" name="schedule" value="flexible" className="w-4 h-4 text-blue-600" onChange={e => setFormData(prev => ({
                ...prev,
                workSchedule: e.target.value
              }))} />
                    <span className="text-gray-700">Гибкий график на выбор</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="radio" name="schedule" value="fulltime" className="w-4 h-4 text-blue-600" onChange={e => setFormData(prev => ({
                ...prev,
                workSchedule: e.target.value
              }))} />
                    <span className="text-gray-700">Полный рабочий день</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="radio" name="schedule" value="any" className="w-4 h-4 text-blue-600" onChange={e => setFormData(prev => ({
                ...prev,
                workSchedule: e.target.value
              }))} />
                    <span className="text-gray-700">Всё равно</span>
                  </label>
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={handleBack} className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Назад</span>
                  </button>
                  <button onClick={() => handleNext('workSchedule', formData.workSchedule)} disabled={!formData.workSchedule} className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
                    Далее
                  </button>
                </div>
              </div>}

            {/* Age Step */}
            {currentStep === 'age' && <div className="pt-4 animate-slide-up">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                  Сколько вам лет?
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="radio" name="age" value="under25" className="w-4 h-4 text-blue-600" onChange={e => setFormData(prev => ({
                ...prev,
                age: e.target.value
              }))} />
                    <span className="text-gray-700">До 25</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="radio" name="age" value="25to40" className="w-4 h-4 text-blue-600" onChange={e => setFormData(prev => ({
                ...prev,
                age: e.target.value
              }))} />
                    <span className="text-gray-700">От 25 до 40</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="radio" name="age" value="40to55" className="w-4 h-4 text-blue-600" onChange={e => setFormData(prev => ({
                ...prev,
                age: e.target.value
              }))} />
                    <span className="text-gray-700">От 40 до 55</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="radio" name="age" value="over55" className="w-4 h-4 text-blue-600" onChange={e => setFormData(prev => ({
                ...prev,
                age: e.target.value
              }))} />
                    <span className="text-gray-700">Выше 55</span>
                  </label>
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={handleBack} className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Назад</span>
                  </button>
                  <button onClick={() => handleNext('age', formData.age)} disabled={!formData.age} className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
                    Далее
                  </button>
                </div>
              </div>}

            {/* Proximity Step */}
            {currentStep === 'proximity' && <div className="pt-4 animate-slide-up">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                  Важна ли вам близость работы к дому?
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="radio" name="proximity" value="not-important" className="w-4 h-4 text-blue-600" onChange={e => setFormData(prev => ({
                ...prev,
                proximity: e.target.value
              }))} />
                    <span className="text-gray-700">Неважно, ради хорошей работы готов ездить</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="radio" name="proximity" value="within-hour" className="w-4 h-4 text-blue-600" onChange={e => setFormData(prev => ({
                ...prev,
                proximity: e.target.value
              }))} />
                    <span className="text-gray-700">Хотелось бы в пределах часа езды</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="radio" name="proximity" value="close-to-home" className="w-4 h-4 text-blue-600" onChange={e => setFormData(prev => ({
                ...prev,
                proximity: e.target.value
              }))} />
                    <span className="text-gray-700">Чем ближе к дому, тем лучше</span>
                  </label>
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={handleBack} className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Назад</span>
                  </button>
                  <button onClick={() => handleNext('proximity', formData.proximity)} disabled={!formData.proximity} className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
                    Далее
                  </button>
                </div>
              </div>}

            {/* Success Step */}
            {currentStep === 'success' && <div className="pt-4 text-center animate-zoom-in">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Работа есть!</h3>
                <p className="text-gray-600 mb-8">
                  Напиши нашему менеджеру по кнопке ниже для начала работы
                </p>
                <button onClick={handleClose} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  Нажимай для начала работы
                </button>
              </div>}
          </div>
        </div>}
    </div>;
};
export default Index;