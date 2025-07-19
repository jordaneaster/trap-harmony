import { supabase } from './supabase'

// Helper function to get the full public URL for an image
function getPublicImageUrl(imagePath) {
  if (!imagePath) return null
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // Construct the public URL using the correct Supabase storage format
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const fullUrl = `${supabaseUrl}/storage/v1/object/public/${imagePath}`
  
  // Debug logging
  console.log('Original image path:', imagePath)
  console.log('Constructed URL:', fullUrl)
  
  return fullUrl
}

// Helper function to format product images
function formatProductImages(product) {
  if (!product.product_images) return product
  
  return {
    ...product,
    product_images: product.product_images.map(image => ({
      ...image,
      image_url: getPublicImageUrl(image.image_url)
    }))
  }
}

// Helper function to format a single product array
function formatProductsArray(products) {
  return (products || []).map(formatProductImages)
}

// Fetch all active categories
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Fetch products with optional category filter
export async function getProducts(categorySlug = null, limit = null) {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories(id, slug, name),
        product_images(image_url, alt_text, is_primary, sort_order)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) throw error
    return formatProductsArray(data)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch featured products
export async function getFeaturedProducts(limit = 6) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(id, slug, name),
        product_images(image_url, alt_text, is_primary, sort_order)
      `)
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    
    console.log('Raw product data from Supabase:', data)
    const formattedData = formatProductsArray(data)
    console.log('Formatted product data:', formattedData)
    
    return formattedData
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

// Fetch single product by ID
export async function getProductById(id) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(id, slug, name),
        product_images(image_url, alt_text, is_primary, sort_order),
        product_variants(*)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) throw error
    return data ? formatProductImages(data) : null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Fetch products by category slug
export async function getProductsByCategory(categorySlug) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories!inner(id, slug, name),
        product_images(image_url, alt_text, is_primary, sort_order)
      `)
      .eq('is_active', true)
      .eq('categories.slug', categorySlug)
      .order('created_at', { ascending: false })

    if (error) throw error
    return formatProductsArray(data)
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

// Get category by slug
export async function getCategoryBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}
