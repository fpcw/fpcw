import { Columns, Container, Section } from "react-bulma-components";
import { Layout, Seo } from "./components";
import { CLINICAL_CREDENTIALS, ContentfulClient, Profile } from "./data";

interface StaffProps {
    profiles: Profile[];
}

export async function query(): Promise<StaffProps> {
    const client = new ContentfulClient();
    const profiles = await client.getProfiles();
    return { profiles };
}

export function Head(_: StaffProps) {
    return (
        <Seo
            title="Staff"
            description="Meet the office staff who support our providers and patients at Family Psychiatry Counseling and Wellness."
        />
    );
}

export default function Staff(props: StaffProps) {
    const profiles = sortProfiles(props.profiles);
    return (
        <Layout>
            <Section>
                <Container>
                    {/* @ts-ignore: @todo: not sure why gap is not found on Columns component */}
                    <Columns gap={4}>
                        <Columns.Column size={4}>
                            <div className="min-[1024px]:sticky min-[1024px]:top-[15vh]">
                                <h1 className="tw-mb-6 tw-font-serif tw-text-5xl tw-leading-tight">
                                    Meet Our Office Staff
                                </h1>
                                <p className="tw-font-sans tw-text-lg">
                                    Our dedicated office staff work behind the scenes to make sure
                                    every visit runs smoothly, from scheduling appointments to
                                    coordinating care with your provider.
                                </p>
                            </div>
                        </Columns.Column>
                        <Columns.Column size={8}>
                            <Columns multiline={true}>
                                {profiles.map(({ slug, name, credential, headshot }, i) => (
                                    <Columns.Column size={4} key={i}>
                                        <a href={`/providers/${slug}`}>
                                            <div className="tw-rounded-3xl tw-h-72 lg:tw-w-72 tw-shadow tw-flex tw-flex-col tw-overflow-hidden">
                                                <div className="tw-grow tw-overflow-hidden">
                                                    <img
                                                        src={headshot}
                                                        key={slug}
                                                        className="tw-w-full tw-h-full tw-object-cover tw-object-top"
                                                    />
                                                </div>
                                                <div className="tw-px-4 tw-py-2 tw-text-slate-600 tw-font-sans tw-font-medium">
                                                    {name}
                                                    {credential ? `, ${credential}` : ""}
                                                </div>
                                            </div>
                                        </a>
                                    </Columns.Column>
                                ))}
                            </Columns>
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        </Layout>
    );
}

function sortProfiles(profiles: Profile[]): Profile[] {
    return profiles
        .filter((p) => !CLINICAL_CREDENTIALS.includes(p.credential ?? ""))
        .sort((a, b) => a.name.localeCompare(b.name));
}
