export default function AddressInput() {
    return (
        <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
            </label>
            <div className="mt-1">
                <input
                    type="email"
                    name="address"
                    id="address"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="0x0000000000000000000000000000000000000000"
                />
            </div>
        </div>
    )
}
