// Task 4: API Routes - GET & POST

export async function GET(request) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const products = await res.json();

    return Response.json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      data: products,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to fetch products",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
