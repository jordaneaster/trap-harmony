import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { collection_id } = req.query

    let query = supabase
      .from('products')
      .select(`
        id,
        name,
        slug,
        description,
        price,
        sku,
        is_active,
        collection_id,
        product_images (
          id,
          image_url,
          alt_text,
          sort_order,
          is_primary
        ),
        product_variants (
          id,
          name,
          size,
          color,
          sku,
          price,
          stock_quantity,
          is_active
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    // Filter by collection if specified
    if (collection_id) {
      query = query.eq('collection_id', collection_id)
    }

    const { data: products, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ 
        error: 'Failed to fetch products',
        details: error.message 
      })
    }

    // Process products to format images and variants
    const processedProducts = products.map(product => ({
      ...product,
      // Sort images by sort_order and is_primary
      product_images: product.product_images
        ?.sort((a, b) => {
          if (a.is_primary && !b.is_primary) return -1
          if (!a.is_primary && b.is_primary) return 1
          return a.sort_order - b.sort_order
        }) || [],
      // Filter active variants
      product_variants: product.product_variants
        ?.filter(variant => variant.is_active) || []
    }))

    return res.status(200).json({
      products: processedProducts,
      count: processedProducts.length
    })

  } catch (error) {
    console.error('API error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    })
  }
}
