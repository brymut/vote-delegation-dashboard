import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTwitter, faGithub, faTelegram, faMedium } from '@fortawesome/free-brands-svg-icons'

const navigation = {
    main: [
        { name: 'Forum', href: 'https://gov.apwine.fi/', current: false },
        { name: 'Documentation', href: 'https://docs.apwine.fi/', current: false },
        { name: 'Snapshot', href: 'https://snapshot.org/#/apwine.eth', current: false },
        { name: 'App', href: 'https://apwine.fi', current: false },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-black/50 mx-5 md:mx-20 my-10 rounded-xl">
            <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
                <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                    {navigation.main.map((item) => (
                        <div key={item.name} className="px-5 py-2">
                            <a href={item.href} target="_blank" rel="noreferrer" className="text-base text-gray-100">
                                {item.name}
                            </a>
                        </div>
                    ))}
                </nav>
                <div className="mt-8 flex justify-center space-x-6 text-gray-100">
                    <a key="Discord" href="https://t.co/Drdu6DwZT5" target="_blank" rel="noreferrer" className="">
                        <span className="sr-only">Discord</span>
                        <FontAwesomeIcon className="ml-2" icon={faDiscord} />
                    </a>
                    <a key="Twitter" href="https://twitter.com/APWineFinance" target="_blank" rel="noreferrer" className="">
                        <span className="sr-only">Twitter</span>
                        <FontAwesomeIcon className="ml-2" icon={faTwitter} />
                    </a>
                    <a key="Github" href="https://github.com/APWine" target="_blank" rel="noreferrer" className="">
                        <span className="sr-only">Github</span>
                        <FontAwesomeIcon className="ml-2" icon={faGithub} />
                    </a>
                    <a key="Telegram" href="https://t.co/3F6Xi6dLvt" target="_blank" rel="noreferrer" className="">
                        <span className="sr-only">Telegram</span>
                        <FontAwesomeIcon className="ml-2" icon={faTelegram} />
                    </a>
                    <a key="Medium" href="https://medium.com/apwine" target="_blank" rel="noreferrer" className="">
                        <span className="sr-only">Medium</span>
                        <FontAwesomeIcon className="ml-2" icon={faMedium} />
                    </a>
                </div>
                <p className="mt-8 text-center text-base text-gray-400">&copy; APWine, 2022. All rights reserved.</p>
            </div>
        </footer>
    )
}
