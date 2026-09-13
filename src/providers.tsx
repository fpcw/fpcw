import { Columns, Container, Section } from "react-bulma-components";
import { Layout, Seo } from "./components";
import { CLINICAL_CREDENTIALS, ContentfulClient, Profile } from "./data";

interface ProvidersProps {
    title: string;
    description: string;
    profiles: Profile[];
}

export async function query(): Promise<ProvidersProps> {
    const pageId = "4kKLdxoMQhlViViT23ynAX";
    const client = new ContentfulClient();
    const page = await client.getPage(pageId);
    const profiles = await client.getProfiles();
    return {
        title: page.metaTitle ?? "",
        description: (page.metaDescription as string) ?? "",
        profiles,
    };
}

export function Head(props: ProvidersProps) {
    return <Seo title={props.title} description={props.description} />;
}

export default function Providers(props: ProvidersProps) {
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
                                    Find the Right Expert for Your Mental Health Needs
                                </h1>
                                <p className="tw-font-sans tw-text-lg">
                                    Our professional staff consists of board-certified, experienced
                                    psychiatrists, therapists, nurse practitioners, and others. We
                                    are, individually and collectively, committed to providing the
                                    highest quality care to our patients and to advancing wellness
                                    of the mind, body, and spirit.
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
    const clinicians = profiles.filter((p) => CLINICAL_CREDENTIALS.includes(p.credential ?? ""));

    const sabira = clinicians.filter((p) => p.name.includes("Sabira"));
    const psych = clinicians.filter(
        (p) => ["MD", "DO"].includes(p.credential ?? "") && !p.name.includes("Sabira"),
    );
    const np = clinicians.filter((p) => p.credential === "PMHNP");
    const lmft = clinicians.filter((p) => p.credential === "LMFT");
    const lcsw = clinicians.filter((p) => p.credential === "LCSW");

    return ([] as Profile[]).concat(sabira, psych, np, lmft, lcsw);
}
