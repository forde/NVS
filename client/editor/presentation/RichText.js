import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export default function RichText ({ content }) {

    if(!content) return null

    return (
        <div className="content">
            <PortableText
                value={content}
                components={{
                    marks: {
                        internalLink: ({ value, children }) => {

                            const type = value?.document?.type
                            const slug = value?.document?.slug

                            // some sort of href resolver needs to be implemented
                            // so it can construct URLs from type & slug values

                            const linkProps = {
                                href: `/[slug]`,
                                as: `/${slug}`,
                            }

                            return <Link {...linkProps}><a>{children}</a></Link>
                        },
                        link: ({ value, children }) => {
                            return <a href={value?.href} target={value?.blank ? '_blank' : '_self'}>{children}</a>
                        }
                    }
                }}
            />
        </div>
    )
}