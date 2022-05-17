import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTwitter, faGithub, faTelegram, faMedium } from '@fortawesome/free-brands-svg-icons'

const navigation = {
    main: [
        { name: 'Forum', href: 'https://gov.apwine.fi/', current: false },
        { name: 'Documentation', href: 'https://docs.apwine.fi/', current: false },
        { name: 'Snapshot', href: 'https://snapshot.org/#/apwine.eth', current: false },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-white/50 mx-20 my-10 rounded-xl">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                    {navigation.main.map((item) => (
                        <div key={item.name} className="px-5 py-2">
                            <a href={item.href} target="_blank" rel="noreferrer" className="text-base text-gray-500 hover:text-gray-900">
                                {item.name}
                            </a>
                        </div>
                    ))}
                </nav>
                <div className="mt-8 flex justify-center space-x-6">
                    <a key="Discord" href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Discord</span>
                        <FontAwesomeIcon className="ml-2" icon={faDiscord} />
                    </a>
                    <a key="Twitter" href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Twitter</span>
                        <FontAwesomeIcon className="ml-2" icon={faTwitter} />
                    </a>
                    <a key="Github" href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Github</span>
                        <FontAwesomeIcon className="ml-2" icon={faGithub} />
                    </a>
                    <a key="Telegram" href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Telegram</span>
                        <FontAwesomeIcon className="ml-2" icon={faTelegram} />
                    </a>
                    <a key="Medium" href="#" className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Medium</span>
                        <FontAwesomeIcon className="ml-2" icon={faMedium} />
                    </a>
                </div>
                <p className="mt-8 text-center text-base text-gray-400">&copy; APWine, 2022. All rights reserved.</p>
            </div>
        </footer>
    )
}