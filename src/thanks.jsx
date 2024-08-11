import React, { useState, useEffect } from 'react';

function Thanks() {
    const url = new URLSearchParams(window.location.search);
    const orderId = url.get('order_id');
    const initialTransStatus = url.get('transaction_status');
    
    const [transStatus, setTransStatus] = useState(initialTransStatus);

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

    const statusMessage = getStatusMessage(transStatus);

    useEffect(() => {
        const checkTransactionStatus = async () => {
            try {
                const response = await fetch('https://midtrans-callback-test.vercel.app/transaction', {
                        method: 'POST',
                        body: JSON.stringify({ orderId })
                    }
                );
                const data = await response.json();
                
                if (data.transaction_status === 'settlement') {
                    setTransStatus('settlement');
                }
            } catch (error) {
                console.error('Error fetching transaction status:', error);
            }
        };

        const intervalId = setInterval(checkTransactionStatus, 5000);

        if (transStatus === 'settlement') {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [orderId, transStatus]);

    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6 md:mx-auto">
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        {statusMessage}
                    </h3>
                    {statusMessage !== 'Unknown Transaction Status' && (
                        <p className="text-gray-600 my-2">Transaction ID: {orderId ?? 'Null'}</p>
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
