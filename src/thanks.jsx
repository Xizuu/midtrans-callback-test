import React from 'react';

function Thanks() {
    const url = new URLSearchParams(window.location.search);
    const orderId = url.get('order_id');
    const trans_status = url.get('transaction_status');

    const getStatusMessage = (transaction_status) => {
        if (transaction_status === 'pending') {
            return 'Transaction Pending!';
        } else if (transaction_status === 'expire') {
            return 'Transaction Expired!';
        } else if (transaction_status === 'settlement') {
            return 'Transaction Done!';
        } else {
            return 'Unknown Transaction Status';
        }
    };

    const statusMessage = getStatusMessage(trans_status);

    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6 md:mx-auto">
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        {statusMessage}
                    </h3>
                    {statusMessage !== 'Unknown Transaction Status' && (
                        <p className="text-gray-600 my-2">Transaction ID: {orderId}</p>
                    )}
                    <div className="py-10 text-center">
                        <a href="#" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                            GO BACK
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Thanks;
