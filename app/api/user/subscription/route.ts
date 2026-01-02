import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        console.log("--- Subscription GET Start ---");
        const { userId } = await auth();
        console.log("Authenticated userId:", userId);

        if (!userId) {
            console.log("No userId found, returning null subscription");
            return NextResponse.json({ subscription: null }, { status: 200 });
        }

        console.log("Attempting prisma.subscription.findMany...");
        try {
            const subscriptions = await prisma.subscription.findMany({
                where: {
                    userId: userId,
                    status: "active",
                    endDate: {
                        gt: new Date(),
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            console.log("Prisma query successful. Results count:", subscriptions.length);
            return NextResponse.json({ subscriptions });
        } catch (prismaError: any) {
            console.error("!!! PRISMA QUERY FAILED !!!");
            console.error("Error Message:", prismaError.message);
            console.error("Error Code:", prismaError.code);
            console.error("Stack Trace:", prismaError.stack);
            throw prismaError;
        }
    } catch (error: any) {
        console.error("--- SUBSCRIPTION_GET_CRITICAL_ERROR ---");
        console.error("Message:", error.message);
        return NextResponse.json({ 
            error: "Internal Error", 
            details: error.message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined 
        }, { status: 500 });
    }
}
