const FETCH_FAILED_MARKER = "fetch failed";

const isTransientFetchFailure = (message: unknown) =>
    typeof message === "string" && message.toLowerCase().includes(FETCH_FAILED_MARKER);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type DefaultResult = { data: any; error: { message?: string | null } | null };

export const retryFetchFailed = async <R = DefaultResult>(
    operation: () => PromiseLike<R>,
    { retries = 2, initialDelayMs = 200 }: { retries?: number; initialDelayMs?: number } = {}
): Promise<R> => {
    let lastResult: R | undefined;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const result = await operation();
            lastResult = result;

            const errorMessage = (result as { error?: { message?: string | null } | null })?.error?.message;
            if (!isTransientFetchFailure(errorMessage)) {
                return result;
            }
        } catch (error) {
            if (!isTransientFetchFailure((error as Error)?.message)) {
                throw error;
            }
            lastResult = { data: null, error: { message: (error as Error).message } } as unknown as R;
        }

        if (attempt < retries) {
            await wait(initialDelayMs * 2 ** attempt);
        }
    }

    return lastResult as R;
};
