/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2024-01-15 15:00:03
 * @LastEditors: lc
 * @LastEditTime: 2024-01-30 11:03:02
 */
export function encodeStream(data: any) {
  try {
    if(!data){
      throw new Error()
    }
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
