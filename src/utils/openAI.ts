export function encodeStream(data: any) {
  const encodedStream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for await (const chunk of data.stream) {
        const text = await chunk.text();
        const encoded = encoder.encode(text);
        controller.enqueue(encoded);
      }
      controller.close();
    },
  });
  try {
    return new Response(encodedStream, { status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }
  catch (err: any) {
    return new Response(JSON.stringify({
      error: {
        code: err.name,
        message: '请求失败，请稍后重试',
      },
    }), { status: 500 })
  }
}
