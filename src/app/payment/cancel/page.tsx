export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>
        <p className="mt-4 text-gray-700">
          Your payment was cancelled. Please try again or contact support.
        </p>
        <a href="/membership" className="mt-4 inline-block text-blue-500 hover:text-blue-700">
          Back to Membership
        </a>
      </div>
    </div>
  );
}