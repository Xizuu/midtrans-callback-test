function Thanks() {

    // const data = fetch('https://midtrans-restapi-test.vercel.app/transaction/callback')
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error('Response was not OK')
    //         }
    //         return response.json()
    //     });
    const url = new URLSearchParams(window.location.search)
    const orderId = url.get('order_id');
    const trans_status = url.get('transaction_status')

    const status = (transaction_status) => {
        const statusMessage = ''

        if (transaction_status === 'pending') {
            statusMessage = 'Transaction Pending!'
        } else if (transaction_status === 'expire') {
            statusMessage = 'Transaction Expired!'
        } else if (transaction_status === 'settlement') {
            statusMessage = 'Transaction Done!'
        } else {
            return false
        }
        return statusMessage;
    }

    return (
        <>
            <div className="bg-gray-100 h-screen">
                <div className="bg-white p-6 md:mx-auto">
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">{
                                status(trans_status)
                            }</h3>
                        <p className="text-gray-600 my-2">{
                                status !== false ? "Transaction ID: " + orderId : '' 
                            }</p>
                        <div className="py-10 text-center">
                            <a href="#" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Thanks
