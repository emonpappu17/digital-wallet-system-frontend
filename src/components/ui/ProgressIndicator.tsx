import React from 'react';

const ProgressIndicator = ({ currentStep }) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
                {[1, 2, 3, 4].map((step) => (
                    <div
                        key={step}
                        className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= step
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-300 text-gray-500'
                                }`}
                        >
                            {step}
                        </div>
                        {step < 4 && (
                            <div
                                className={`flex-1 h-1 ml-4 ${currentStep > step ? 'bg-green-600' : 'bg-gray-300'
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Amount</span>
                <span>Receiver</span>
                <span>Confirm</span>
                <span>Complete</span>
            </div>
        </div>
    );
};

export default ProgressIndicator;