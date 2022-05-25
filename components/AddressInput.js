import { useContractWrite } from 'wagmi'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { formatBytes32String } from '@ethersproject/strings'
import delegateAbi from '../utils/abis/delegate.json'




export default function AddressInput() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [delegateAddress, setDelegateAddress] = useState(null)
    const space = process.env.NEXT_PUBLIC_APWINE_SPACE
    const { write, isLoading, error } = useContractWrite(
        {
            addressOrName: process.env.NEXT_PUBLIC_APWINE_DELEGATE_REGISTRY_ADDRESS,
            contractInterface: delegateAbi,
        },
        'setDelegate',
        {
            args: [formatBytes32String(space), delegateAddress]

        }
    )
    const onSubmit = (data) => {
        setDelegateAddress(data.address)
        write()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
            </label>
            <div className="mt-4">
                <input
                    type="text"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    {...register("address", { required: true, pattern: /^0x[a-fA-F0-9]{40}$/ })}
                    placeholder="0x0000000000000000000000000000000000000000"
                />
            </div>
            {errors.address && <span className=' text-red-600'>A valid ethereum address is required</span>}
            <br />
            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {isLoading ? "Loading" : "Set Delegate"}
            </button>
        </form>
    )
}
