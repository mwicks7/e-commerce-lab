import clientPromise from "./mongodb";

export async function getCart(cartId) {
  try {
    const client = await clientPromise;
    const db = client.db("eCommerce")

    const data = await db
        .collection("carts")
        .find({cartId: cartId})
        .limit(1)
        // .sort()
        .toArray()
    
    console.log(data)

        return JSON.parse(JSON.stringify(data))
  } catch (e) {
      console.error(e)
  }
}

export async function addCartItem(cartId, product) {
  try {
    const client = await clientPromise;
    const db = client.db("eCommerce")

    const data = await db
        .collection("carts")
        .updateOne(
          { cartId: cartId }, 
          {
            $set: { cartId: cartId },
            $push: { products: product }
          }, 
          { upsert: true }
        )

      console.log(data)
  } catch (e) {
      console.error(e)
  }
}

export async function removeCartItem(cartId, productId) {
   try {
    const client = await clientPromise;
    const db = client.db("eCommerce")

    const data = await db
        .collection("carts")
        .updateOne(
          { cartId: cartId }, 
          {
            $pull: { products: { _id: productId } }
          }, 
          { upsert: false }
        )

      console.log(data)
  } catch (e) {
      console.error(e)
  }
}
