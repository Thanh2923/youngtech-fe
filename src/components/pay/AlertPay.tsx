import React from 'react';

const AlertPay = ({ isVisible, onClose, isLoading, message }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 text-center">
        {/* Tiến chạy vòng tròn khi đang xử lý */}
        {isLoading ? (
          <div className="flex  justify-center mb-4">
            <svg
              role="status"
              className="w-20 h-20  text-red-700  animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill="none"
                d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z"
                className="path"
                stroke="none"
                strokeWidth="0"
              />
              <path
                fill="currentColor"
                d="M93.9711 59.0285C92.4763 56.8769 90.5615 54.2888 88.3447 51.8489C86.1292 49.4102 83.6503 47.2897 81.0613 45.5773C78.4724 43.8648 75.8185 42.5945 73.125 41.7925C70.4314 41.0105 67.7204 39.7072 65.0625 37.9651"
              />
            </svg>
          </div>
        ) : (
          <>
            {/* Hiển thị icon tích khi thanh toán thành công */}
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-16 h-16 text-green-500 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-600">{message}</h2>
          </>
        )}

        {/* Nút đóng modal */}
        <div className="mt-4">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertPay;
