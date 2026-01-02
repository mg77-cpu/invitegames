import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { sendScheduleUpdateEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        // In a real app, you'd check if the user has an 'admin' role here.
        // For now, we'll assume the request is authorized if authenticated.
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { subscriptionId, updateMessage } = await req.json();

        if (!subscriptionId || !updateMessage) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Fetch subscription and user details
        const subscription = await prisma.subscription.findUnique({
            where: { id: subscriptionId },
            include: { user: true }
        });

        if (!subscription) {
            return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
        }

        // Send the email
        const result = await sendScheduleUpdateEmail(subscription.user.email, {
            parentName: subscription.parentName || "Parent",
            athleteName: subscription.athleteName || "your athlete",
            updateMessage: updateMessage,
        });

        if (result?.error) {
            throw result.error;
        }

        return NextResponse.json({ success: true, message: "Schedule update email sent." });
    } catch (error: any) {
        console.error("[SCHEDULE_UPDATE_ERROR]", error);
        return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
    }
}
