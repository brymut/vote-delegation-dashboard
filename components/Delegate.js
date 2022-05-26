import { useEnsName, useEnsAvatar, useContractWrite } from 'wagmi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { formatBytes32String } from '@ethersproject/strings'
import delegateAbi from '../utils/abis/delegate.json'


export default function Delegate({ delegate, currentDelegateAddress }) {
    const [isCurrentDelegate, setIsCurrentDelegate] = useState(false)
    const space = process.env.NEXT_PUBLIC_APWINE_SPACE

    useEffect(() => {
        if (delegate.address === currentDelegateAddress) {
            setIsCurrentDelegate(true)
        }
    }, [currentDelegateAddress, delegate])

    const { write: removeDelegate, isLoading: removeDelegateLoading } = useContractWrite(
        {
            addressOrName: process.env.NEXT_PUBLIC_APWINE_DELEGATE_REGISTRY_ADDRESS,
            contractInterface: delegateAbi,
        },
        'clearDelegate',
        {
            args: [formatBytes32String(space)]

        }
    )

    const { write: setDelegate, isLoading: setDelegateLoading } = useContractWrite(
        {
            addressOrName: process.env.NEXT_PUBLIC_APWINE_DELEGATE_REGISTRY_ADDRESS,
            contractInterface: delegateAbi,
        },
        'setDelegate',
        {
            args: [formatBytes32String(space), delegate.address]

        }
    )

    const { data: ensAvatar } = useEnsAvatar({
        addressOrName: delegate.address,
    })
    const { data: ensName } = useEnsName({
        address: delegate.address,
    })
    return (
        <div className='flex flex-col max-w-sm'>
            <div className="col-span-1 flex flex-col text-center backdrop-filter backdrop-blur-sm dark:bg-black bg-gray-500 dark:bg-opacity-25 bg-opacity-5 rounded-lg">
                <div className="flex-1 flex flex-col p-4">
                { (delegate.imageUrl || ensAvatar) ? (
                     <div>
                        <Image className="flex-shrink-0 mx-auto rounded-full" src={delegate.imageUrl || ensAvatar} width={100} height={100} alt="Delegate Avatar" />
                     </div>
                ) : (null)
                }
               
                <h3 className="mt-6 font-bold text-gray-100 text-sm">{delegate.name || ensName}</h3>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">Address</dt>
                    <a href={`https://etherscan.io/address/${delegate.address}`} target="_blank" rel="noreferrer">
                        <dd className="text-gray-300 text-xs truncate">{delegate.address}</dd>
                    </a>
                    <dt className="sr-only">Bio</dt>
                    <dd className="pt-4 text-gray-100 text-sm">{delegate.bio}</dd>
                </dl>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-500">
                    {delegate.twitter ? (
                        <div className="w-0 flex-1 flex">
                            <a
                                href={`https://twitter.com/${delegate.twitter}`}
                                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-100 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                            >
                                <FontAwesomeIcon icon={faTwitter} />
                                <span className="ml-3">{`@${delegate.twitter}`}</span>
                            </a>
                        </div>
                    )
                        :
                        (null)
                    }
                    {
                        delegate.discordId ? (
                            <div className="-ml-px w-0 flex-1 flex">
                                <a
                                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-100 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                >
                                    <FontAwesomeIcon className="ml-2" icon={faDiscord} />
                                    <span className="ml-2 truncate">{delegate.discordId}</span>
                                </a>
                            </div>
                        )
                            :
                                (null)
                    }
                </div>
            </div>
            </div>
            {isCurrentDelegate ?
                (
                    <button
                        type="button"
                        onClick={() => removeDelegate()}
                        className="mt-2 justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-100 bg-brand-indigo  hover:bg-brand-indigo/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {removeDelegateLoading ? "Removing Delegate" : "Remove Delegate"}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setDelegate()}
                        className="mt-2 justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-100 bg-brand-indigo  hover:bg-brand-indigo/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {setDelegateLoading ? "Setting Delegate" : "Set Delegate"}
                    </button>
                )}

        </div>
    )
}
