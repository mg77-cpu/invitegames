import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailProps) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not set. Skipping email send.");
        return;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Invited Games <onboarding@resend.dev>', // Default Resend domain for testing
            to: [to],
            subject: subject,
            html: html,
        });

        if (error) {
            console.error("Failed to send email:", error);
            return { error };
        }

        return { data };
    } catch (err) {
        console.error("Error sending email:", err);
        return { error: err };
    }
}

/**
 * Sends a registration confirmation & receipt email
 */
export async function sendRegistrationEmail(email: string, details: {
    parentName: string;
    athleteName: string;
    planName: string;
    amount: number;
    endDate: string;
}) {
    const subject = `Registration Confirmed: ${details.athleteName} - Invited Games`;
    const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #022c22; color: white; padding: 24px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Registration Confirmed</h1>
                <p style="margin-top: 8px; opacity: 0.9;">Welcome to the Next Generation of Country Club Sports</p>
            </div>
            <div style="padding: 32px; color: #1f2937;">
                <p>Dear ${details.parentName},</p>
                <p>Thank you for registering <strong>${details.athleteName}</strong> for the <strong>${details.planName}</strong>. We are thrilled to have you as part of the Invited Games community.</p>
                
                <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 24px 0;">
                    <h2 style="margin-top: 0; font-size: 18px; color: #022c22;">Registration Details</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Athlete:</td>
                            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${details.athleteName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Membership:</td>
                            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${details.planName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Amount Paid:</td>
                            <td style="padding: 8px 0; text-align: right; font-weight: 600;">$${(details.amount / 100).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Valid Until:</td>
                            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${details.endDate}</td>
                        </tr>
                    </table>
                </div>

                <p>You can view your full registration details, schedules, and download receipts at any time by logging into your portal:</p>
                
                <div style="text-align: center; margin: 32px 0;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://invitedgames.com'}/portal" 
                       style="background-color: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 600;">
                        Go to Member Portal
                    </a>
                </div>

                <p style="font-size: 14px; color: #6b7280; margin-top: 32px;">
                    If you have any questions, please reply to this email or contact our support team.
                </p>
            </div>
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
                &copy; ${new Date().getFullYear()} Invited Games LLC. All rights reserved.
            </div>
        </div>
    `;

    return sendEmail({ to: email, subject, html });
}

/**
 * Sends a schedule update email
 */
export async function sendScheduleUpdateEmail(email: string, details: {
    parentName: string;
    athleteName: string;
    updateMessage: string;
}) {
    const subject = `Schedule Update: ${details.athleteName} - Invited Games`;
    const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #022c22; color: white; padding: 24px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Schedule Update</h1>
            </div>
            <div style="padding: 32px; color: #1f2937;">
                <p>Dear ${details.parentName},</p>
                <p>There has been an update to the schedule for <strong>${details.athleteName}</strong>:</p>
                
                <div style="background-color: #fffbeb; border-left: 4px solid #d97706; padding: 16px; margin: 24px 0;">
                    <p style="margin: 0; color: #92400e;">${details.updateMessage}</p>
                </div>

                <p>Please check the Member Portal for the most up-to-date fixtures and times.</p>
                
                <div style="text-align: center; margin: 32px 0;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://invitedgames.com'}/portal" 
                       style="background-color: #022c22; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 600;">
                        View Full Schedule
                    </a>
                </div>
            </div>
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
                &copy; ${new Date().getFullYear()} Invited Games LLC. All rights reserved.
            </div>
        </div>
    `;

    return sendEmail({ to: email, subject, html });
}
