import { Columns, Container, Hero, Icon, Section } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Layout, Seo, Reviews } from "./components";
import { ContentfulClient, Post, Review } from "./data";
import { Document, Text } from "@contentful/rich-text-types";

const ratings = [
    {
        key: "google",
        link: "https://www.google.com/search?sxsrf=ALeKk00VCh2E4hyk89Nj9ExwQPWMR02uAg%3A1586936272331&source=hp&ei=0LmWXob-EYWw0PEPtPiGsAs&q=family+psychiatry+and+wellness&oq=famil&gs_lcp=CgZwc3ktYWIQARgAMgQIIxAnMgQIIxAnMgQIIxAnMgQIABBDMgQIABBDMgQIABBDMgQIABBDMgIIADICCAAyAggAOgcIABCDARBDOgUIABCRAjoFCAAQgwE6BggAEAoQQ0oVCBcSETItMTczZzIzNmcyOTNnMzAySg0IGBIJMi0xZzFnMWcxUKLF_QJYnMb9AmCE0v0CaANwAHgAgAGgAogB4QaSAQUxLjAuM5gBAKABAaoBB2d3cy13aXo&sclient=psy-ab",
        icon: faGoogle,
        rating: 4.8,
    },
    {
        key: "facebook",
        link: "https://www.facebook.com/www.familypsychiatry101.net/",
        icon: faFacebookSquare,
        rating: 4.1,
    },
    {
        key: "vitals",
        link: "https://www.vitals.com/doctors/Dr_Sabira_Saifuddin/reviews",
        icon: faHeartbeat,
        rating: 5.0,
    },
];

interface IndexProps {
    title: string;
    description: string;
    posts: Post[];
    reviews: Review[];
}

export async function query(): Promise<IndexProps> {
    const pageId = "6dHGP2shE0LRIUz9YgPAat";
    const client = new ContentfulClient();
    const page = await client.getPage(pageId);
    const posts = await client.getPosts();
    const reviews = await client.getReviews();
    return {
        title: page.metaTitle ?? "",
        description: (page.metaDescription as string) ?? "",
        posts: posts.slice(0, 4),
        reviews,
    };
}

export function Head(props: IndexProps) {
    return <Seo title={props.title} description={props.description} />;
}

export default function Index(props: IndexProps) {
    return (
        <Layout>
            <Hero size="fullheight" hasNavbar={true}>
                <Hero.Body>
                    <Container>
                        <Columns>
                            <Columns.Column size={6} className="tw-mb-12">
                                <div className="tw-space-y-10">
                                    <h1 className="tw-font-serif tw-text-6xl">
                                        Family Psychiatry
                                        <br />
                                        Counseling & Wellness
                                    </h1>

                                    <div className="tw-space-y-6">
                                        <p className="tw-font-sans tw-text-xl tw-text-slate-500">
                                            A comprehensive psychiatric clinic serving the mental
                                            and emotional health needs of all members of the family.
                                            Our mission is to help you live your best life.
                                        </p>
                                        <p className="tw-font-sans tw-text-xl tw-text-slate-500">
                                            We diagnose and treat a variety of mental health
                                            symptoms and conditions—with or without medications. We
                                            also offer transcranial magnetic stimulation (TMS).
                                        </p>
                                        <p className="tw-font-sans tw-text-xl tw-text-slate-500">
                                            We accept most commercial insurances. Same day
                                            appointments available.
                                        </p>
                                    </div>

                                    <div>
                                        <a href="/appointments">
                                            <button className="tw-rounded-full tw-px-6 tw-py-4 tw-text-xl tw-font-sans tw-font-bold tw-text-white tw-bg-gradient-to-r tw-from-[#48C744] tw-to-emerald-500">
                                                Request an appointment
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </Columns.Column>
                            <Columns.Column size={6}>
                                <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-y-8">
                                    <a href="/services" className="tw-justify-self-center">
                                        <Card
                                            label="Services"
                                            feature="./images/servicesplash.jpg"
                                        />
                                    </a>
                                    <a
                                        href="/library/telepsychiatry-telecounseling"
                                        className="tw-justify-self-center"
                                    >
                                        <Card
                                            label="Telehealth"
                                            feature="./images/telehealthsplash.jpg"
                                        />
                                    </a>
                                    <a href="/tms" className="tw-justify-self-center">
                                        <Card
                                            label="Transcranial Magnetic Stimulation"
                                            feature="./images/tmssplash.jpg"
                                        />
                                    </a>
                                    <a href="/library" className="tw-justify-self-center">
                                        <Card
                                            label="Health Library"
                                            feature="./images/librarysplash.jpg"
                                        />
                                    </a>
                                </div>
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Hero.Body>
            </Hero>{" "}
            <Section>
                <Container>
                    <Columns centered={true}>
                        <Columns.Column size={6}>
                            <div className="tw-space-y-6">
                                <h2 className="tw-font-serif tw-text-5xl">
                                    Holistic psychiatry for the mind, body and soul
                                </h2>
                                <p className="tw-font-sans tw-text-lg">
                                    At Family Psychiatry Counseling and Wellness, we specialize in
                                    performing comprehensive psychiatric and psychological
                                    evaluations to establish accurate diagnoses and prepare
                                    individualized treatment plans. We combine advanced conventional
                                    methods with safe alternative treatment approaches to bring
                                    about lasting relief and improved quality of life.
                                </p>
                            </div>
                        </Columns.Column>
                        <Columns.Column size={6} textAlign="center">
                            <img
                                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="tw-rounded-lg"
                            />
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
            <Section my={6}>
                <Container>
                    <Columns>
                        <Columns.Column size={6}>
                            <div className="tw-space-y-6">
                                <h2 className="tw-font-serif tw-text-5xl">
                                    What our patients are saying
                                </h2>
                                <Columns breakpoint="mobile">
                                    {ratings.map((rating) => (
                                        <Columns.Column size={4}>
                                            <Rating
                                                key={rating.key}
                                                link={rating.link}
                                                icon={rating.icon}
                                                rating={rating.rating}
                                            />
                                        </Columns.Column>
                                    ))}
                                </Columns>
                            </div>
                        </Columns.Column>
                        <Columns.Column size={6}>
                            <Reviews reviews={props.reviews} />
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
            <Section>
                <Container py={6}>
                    <div className="tw-space-y-6">
                        <h2 className="tw-font-serif tw-text-5xl">Health Resources</h2>
                        <Columns>
                            {props.posts.map((post, i) => (
                                <Columns.Column size={3} key={i}>
                                    <a href={`/library/${post.slug}`}>
                                        <LongCard
                                            label={post.title}
                                            feature={post.feature}
                                            excerpt={extractExcerptFromRichText(post.body!, 40)}
                                        />
                                    </a>
                                </Columns.Column>
                            ))}
                        </Columns>
                    </div>
                </Container>
            </Section>
        </Layout>
    );
}

function Rating({ link, icon, rating }: { link: string; icon: IconDefinition; rating: number }) {
    return (
        <div>
            <a href={link} target="_blank" rel="noopener noreferrer">
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-6">
                    <Icon className="tw-text-[#48C744]">
                        <FontAwesomeIcon icon={icon} size="2x" />
                    </Icon>
                    <div className="tw-flex tw-items-center">
                        <div className="tw-text-slate-400 tw-font-bold tw-text-3xl">
                            {rating.toFixed(1)}
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}

function Card(props: { label: string; feature: string }) {
    return (
        <div className="tw-rounded-3xl tw-h-72 lg:tw-w-72 tw-shadow tw-flex tw-flex-col tw-overflow-hidden">
            <div className="tw-grow tw-overflow-hidden">
                <img
                    src={props.feature}
                    alt="@todo"
                    className="tw-w-full tw-h-full tw-object-top tw-object-cover"
                />
            </div>
            <div className="tw-px-4 tw-py-2 tw-text-slate-600 tw-font-sans tw-font-medium">
                {props.label}
            </div>
        </div>
    );
}

function LongCard(props: { label: string; feature?: string; excerpt: string }) {
    return (
        <div className="tw-rounded-3xl tw-h-[36rem] lg:tw-w-72 tw-shadow tw-flex tw-flex-col tw-overflow-hidden">
            <div className="tw-grow tw-overflow-hidden">
                <img src={props.feature ?? ""} className="tw-w-full tw-h-full tw-object-cover" />
            </div>
            <div className="tw-flex-none tw-px-4 tw-py-6 tw-h-72 tw-space-y-2">
                <div className="tw-text-slate-600 tw-font-sans tw-font-medium">{props.label}</div>
                <p className="tw-text-slate-500">{props.excerpt}</p>
            </div>
        </div>
    );
}

function extractExcerptFromRichText(document: Document, length: number): string {
    const firstParagraph = document.content.find(({ nodeType }) => nodeType === "paragraph");
    const firstText = firstParagraph?.content.find(({ nodeType }) => nodeType === "text") as Text;
    const excerpt = firstText?.value.split(" ").slice(0, length).join(" ");
    return excerpt ? `${excerpt}...` : "Excerpt could not be generated for this content.";
}
