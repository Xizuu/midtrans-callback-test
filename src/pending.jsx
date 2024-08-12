function Pending() {

    return (
        <>
            <div className="bg-gray-100 h-screen">
                <div className="bg-white p-6 md:mx-auto">
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Pembayaran tertundai</h3>
                        <p className="text-gray-600 my-2">Silahkan konfirmasi pembayaran untuk melanjutkan pembelian!</p>
                        <div className="py-10 text-center">
                            <a href="https://nauticalmc.xyz" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                Kembali
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pending
