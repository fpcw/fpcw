import { Columns, Container, Section } from "react-bulma-components";
import { Layout, Seo, RichText, NewsletterSignupForm } from "../components";
import { ContentfulClient, Post as PostInfo } from "../data";
import { InstanceInfo } from "../../engine";

interface InstanceParams {
    postId: string;
}

export async function instances(): Promise<InstanceInfo<InstanceParams>[]> {
    const client = new ContentfulClient();
    const posts = await client.getPosts();
    return posts.map((post) => ({
        path: `library/${post.slug}`,
        params: {
            postId: post.id,
        },
    }));
}

interface PostProps {
    post: PostInfo;
}

export async function query(params: InstanceParams): Promise<PostProps> {
    const client = new ContentfulClient();
    const post = await client.getPost(params.postId);
    return { post };
}

export function Head(props: PostProps) {
    const { title, metaTitle, metaDescription } = props.post;
    return <Seo title={metaTitle ?? title} description={metaDescription ?? ""} />;
}

export default function Post(props: PostProps) {
    const { title, feature, body } = props.post;

    return (
        <Layout>
            <Section>
                <Container>
                    <Columns multiline={true}>
                        <Columns.Column size="half">
                            <h1 className="tw-font-serif tw-text-6xl">{title}</h1>
                        </Columns.Column>
                        <Columns.Column size={12}>
                            <Columns>
                                <Columns.Column size="half" className="tw-space-y-6">
                                    <img
                                        src={feature}
                                        alt="Post feature"
                                        className="tw-rounded-lg"
                                    />
                                    <RichText src={body} />
                                </Columns.Column>
                                <Columns.Column size="one-quarter">
                                    <NewsletterSignupForm />
                                </Columns.Column>
                            </Columns>
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        </Layout>
    );
}
