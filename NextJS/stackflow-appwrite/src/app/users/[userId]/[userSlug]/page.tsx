import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { MagicCard, MagicContainer } from "@/components/magicui/magic-card";
import NumberTicker from "@/components/magicui/number-ticker";
import { answerCollection, db, questionCollection } from "@/models/name";
import { Query } from "node-appwrite";

const Page = async ({ params }: { params: { userId: string; userSlug: string } }) => {
    try {
        const [user, questions, answers] = await Promise.all([
            users.get<UserPrefs>(params.userId).catch(() => null),
            databases.listDocuments(db, questionCollection, [
                Query.equal("authorId", params.userId),
                Query.limit(1),
            ]).catch(() => ({ total: 0 })),
            databases.listDocuments(db, answerCollection, [
                Query.equal("authorId", params.userId),
                Query.limit(1),
            ]).catch(() => ({ total: 0 })),
        ]);

        return (
            <MagicContainer className="flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row">
                <MagicCard className="relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl">
                    <h2 className="absolute inset-x-4 top-4 text-xl font-medium">Reputation</h2>
                    <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
                        <NumberTicker value={user?.prefs?.reputation ?? 0} />
                    </p>
                    <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                </MagicCard>

                <MagicCard className="relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl">
                    <h2 className="absolute inset-x-4 top-4 text-xl font-medium">Questions asked</h2>
                    <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
                        <NumberTicker value={questions?.total ?? 0} />
                    </p>
                    <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                </MagicCard>

                <MagicCard className="relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl">
                    <h2 className="absolute inset-x-4 top-4 text-xl font-medium">Answers given</h2>
                    <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
                        <NumberTicker value={answers?.total ?? 0} />
                    </p>
                    <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                </MagicCard>
            </MagicContainer>
        );
    } catch (error) {
        return (
            <div className="flex h-screen items-center justify-center text-xl font-semibold text-red-600">
                Failed to load user data.
            </div>
        );
    }
};

export default Page;
