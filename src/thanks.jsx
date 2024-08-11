import React, { useState, useEffect } from 'react';

function Thanks() {
    const url = new URLSearchParams(window.location.search);
    const orderId = url.get('order_id');
    
    const [transStatus, setTransStatus] = useState(null); // Awalnya status tidak diketahui

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
        const fetchTransactionStatus = async () => {
            try {
                const response = await fetch('https://midtrans-restapi-test.vercel.app/transaction/callback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ orderId })
                });
                const data = await response.json();
                setTransStatus(data.transaction_status); // Set status transaksi dari respons backend
            } catch (error) {
                console.error('Error fetching transaction status:', error);
            }
        };

        fetchTransactionStatus();

        const intervalId = setInterval(fetchTransactionStatus, 5000); // Cek status setiap 5 detik

        if (transStatus === 'settlement') {
            clearInterval(intervalId); // Hentikan pengecekan jika status sudah 'settlement'
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
