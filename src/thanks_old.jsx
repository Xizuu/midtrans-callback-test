import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Thanks() {
    const location = useLocation();
    const navigate = useNavigate();
    const [transStatus, setTransStatus] = useState(null);
    
    const url = new URLSearchParams(location.search);
    const orderId = url.get('order_id');
    const initialUrl = location.pathname + location.search;

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

    useEffect(() => {
        const fetchTransactionStatus = async () => {
            try {
                const response = await fetch('https://midtrans-restapi-test.vercel.app/transaction/callback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ orderId })
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch transaction status');
                }

                const data = await response.json();
                
                if (!data.transaction_status) {
                    throw new Error('Invalid transaction status');
                }

                setTransStatus(data.transaction_status);
            } catch (error) {
                console.error('Error fetching transaction status:', error);
            
            }
        };

        if (orderId) {
            fetchTransactionStatus();
        }

    }, [orderId]);

    useEffect(() => {
        if (location.pathname + location.search !== initialUrl) {
            navigate(initialUrl, { replace: true });
        }
    }, [location, initialUrl, navigate]);

    const statusMessage = getStatusMessage(transStatus);

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
                        <a href="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                            GO BACK
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Thanks;
