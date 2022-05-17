import { useState } from 'react'
import Image from 'next/image'
import { useAccount, useConnect, useDisconnect, useEnsName, useEnsAvatar } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Disclosure } from '@headlessui/react'
import { LinkIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
    { name: 'Forum', href: 'https://gov.apwine.fi/', current: false },
    { name: 'Documentation', href: 'https://docs.apwine.fi/', current: false },
    { name: 'Snapshot', href: 'https://snapshot.org/#/apwine.eth', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
    const { data: account } = useAccount()
    const { data: ensName } = useEnsName({ address: account?.address })
    const { connect, error, isConnecting, pendingConnector } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()
    const [showDisconnectText, setShowDisconnectText] = useState(false)

    return (
        <Disclosure as="nav" className="bg-white/50 mx-20 my-8 rounded-xl">
            {({ open }) => (
                <>
                    <div className="mx-auto px-2 md:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <div className="block lg:hidden pt-2  w-auto">
                                        <Image src="/apw-logo-light-circle.png" alt="APWine Logo" width={50} height={50} />
                                    </div>
                                    <div className="hidden lg:block  w-auto">
                                        <Image src="/apw-text-transparent-color.png" alt="APWine Logo" width={175} height={42} />
                                    </div>
                                </div>
                                <div className="hidden md:block md:ml-6 pt-5 lg:pt-3">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-brand-purple hover:text-brand-indigo"
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                                <div className="hidden md:block" >
                                    {account ?
                                        (
                                            <>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={() => disconnect()}
                                                    onMouseEnter={() => setShowDisconnectText(true)}
                                                    onMouseLeave={() => setShowDisconnectText(false)}
                                                >
                                                    {
                                                        showDisconnectText ?
                                                            (
                                                                <span className="truncate max-w-sm">
                                                                    Disconnect
                                                                </span>

                                                            ) : (
                                                                <span className="truncate max-w-sm">
                                                                    Connected to {ensName ?? `${account.address.substring(0, 5)}...${account.address.substring(account.address.length - 3)}`}
                                                                </span>
                                                            )
                                                    }
                                                </button>
                                            </>
                                        ) :
                                        (
                                            <>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={() => connect()}
                                                >
                                                    <LinkIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                                                    Connect Wallet
                                                </button>
                                            </>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name} 
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-brand-purple hover:text-brand-indigo',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                            <div className="px-2">
                                {account ?
                                    (
                                        <>
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={() => disconnect()}
                                                onMouseEnter={() => setShowDisconnectText(true)}
                                                onMouseLeave={() => setShowDisconnectText(false)}
                                            >
                                                {
                                                    showDisconnectText ?
                                                        (
                                                            <span className="truncate max-w-sm">
                                                                Disconnect
                                                            </span>

                                                        ) : (
                                                            <span className="truncate max-w-sm">
                                                                Connected to {ensName ?? `${account.address.substring(0, 5)}...${account.address.substring(account.address.length - 3)}`}
                                                            </span>
                                                        )
                                                }
                                            </button>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={() => connect()}
                                            >
                                                <LinkIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                                                Connect Wallet
                                            </button>
                                        </>
                                    )}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
