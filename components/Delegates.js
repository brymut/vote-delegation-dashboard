/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'


export default function Delegates({ delegates }) {
    return (
        <ul role="list" className={delegates.length > 1 ? "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3" : "w-72"}>
            {delegates.map((person) => (
                <li
                    key={person.email}
                    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                    <div className="flex-1 flex flex-col p-8">
                        <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={person.imageUrl} alt="" />
                        <h3 className="mt-6 text-gray-900 text-sm font-medium">{person.name}</h3>
                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                            <dt className="sr-only">Address</dt>
                            <dd className="text-gray-500 text-xs truncate">{person.address}</dd>
                            <dt className="sr-only">Bio</dt>
                            <dd className="pt-4 text-gray-500 text-sm">{person.bio}</dd>
                        </dl>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="w-0 flex-1 flex">
                                <a
                                    href={`https://twitter.com/${person.twitter}`}
                                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                >
                                    {/* <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" /> */}
                                    <FontAwesomeIcon icon={faTwitter} />
                                    <span className="ml-3">{`@${person.twitter}`}</span>
                                </a>
                            </div>
                            <div className="-ml-px w-0 flex-1 flex">
                                <a
                                    href={`tel:${person.telephone}`}
                                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                >
                                    {/* <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" /> */}
                                    <FontAwesomeIcon className="ml-2" icon={faDiscord} />
                                    <span className="ml-2 truncate">{person.discordId}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
