import { useEnsName, useEnsAvatar } from 'wagmi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import logoImg from '../public/apw-logo-light-circle.png'


export default function Delegate({ delegate }) {
    const { data: ensAvatar } = useEnsAvatar({
        addressOrName: delegate.address,
    })
    const { data: ensName } = useEnsName({
        address: delegate.address,
    })
    return (
        <div className='className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"'>
            <div className="flex-1 flex flex-col p-8">
                <div>
                    <Image className="flex-shrink-0 mx-auto rounded-full" src={delegate.imageUrl || ensAvatar || logoImg} width={100} height={100} alt="Delegate Avatar" />
                </div>
                <h3 className="mt-6 text-gray-900 text-sm font-medium">{delegate.name || ensName}</h3>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">Address</dt>
                    <a href={`https://etherscan.io/address/${delegate.address}`} target="_blank" rel="noreferrer">
                        <dd className="text-gray-500 text-xs truncate">{delegate.address}</dd>
                    </a>
                    <dt className="sr-only">Bio</dt>
                    <dd className="pt-4 text-gray-500 text-sm">{delegate.bio}</dd>
                </dl>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                    {delegate.twitter ? (
                        <div className="w-0 flex-1 flex">
                            <a
                                href={`https://twitter.com/${delegate.twitter}`}
                                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
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
                                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
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
    )
}