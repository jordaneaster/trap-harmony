const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for admin operations
)

async function updateProductImages() {
  try {
    console.log('Starting product images update...')

    // Get the Gods Don't Sleep product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, name, collection_id')
      .eq('collection_id', 'collection_001')
      .eq('name', "Gods Don't Sleep Tee")
      .single()

    if (productError || !product) {
      console.error('Product not found:', productError)
      return
    }

    console.log('Found product:', product)

    // Get all current product images
    const { data: currentImages, error: imagesError } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', product.id)

    if (imagesError) {
      console.error('Error fetching current images:', imagesError)
      return
    }

    console.log('Current images:', currentImages.length)

    // Delete all current product images (we'll recreate them properly)
    const { error: deleteError } = await supabase
      .from('product_images')
      .delete()
      .eq('product_id', product.id)

    if (deleteError) {
      console.error('Error deleting current images:', deleteError)
      return
    }

    // Define the correct image structure for each variant
    const variantImages = [
      // Black variant images
      {
        product_id: product.id,
        image_url: 'trapnharmony/collection_001/gods/GodsDontSleep-Black-Front.jpg',
        alt_text: "Gods Don't Sleep Tee - Black - Front",
        is_primary: true,
        sort_order: 1,
        variant_color: 'black'
      },
      {
        product_id: product.id,
        image_url: 'trapnharmony/collection_001/gods/GodsDontSleep-Black-Back.jpg',
        alt_text: "Gods Don't Sleep Tee - Black - Back",
        is_primary: false,
        sort_order: 2,
        variant_color: 'black'
      },
      // White variant images
      {
        product_id: product.id,
        image_url: 'trapnharmony/collection_001/gods/GodsDontSleep-White-Front.jpg',
        alt_text: "Gods Don't Sleep Tee - White - Front",
        is_primary: true,
        sort_order: 1,
        variant_color: 'white'
      },
      {
        product_id: product.id,
        image_url: 'trapnharmony/collection_001/gods/GodsDontSleep-White-Back.jpg',
        alt_text: "Gods Don't Sleep Tee - White - Back",
        is_primary: false,
        sort_order: 2,
        variant_color: 'white'
      },
      // Red variant images
      {
        product_id: product.id,
        image_url: 'trapnharmony/collection_001/gods/GodsDontSleep-Red-Front.jpg',
        alt_text: "Gods Don't Sleep Tee - Red - Front",
        is_primary: true,
        sort_order: 1,
        variant_color: 'red'
      },
      {
        product_id: product.id,
        image_url: 'trapnharmony/collection_001/gods/GodsDontSleep-Red-Back.jpg',
        alt_text: "Gods Don't Sleep Tee - Red - Back",
        is_primary: false,
        sort_order: 2,
        variant_color: 'red'
      },
      // Yellow variant images
      {
        product_id: product.id,
        image_url: 'trapnharmony/collection_001/gods/GodsDontSleep-Yellow-Front.jpg',
        alt_text: "Gods Don't Sleep Tee - Yellow - Front",
        is_primary: true,
        sort_order: 1,
        variant_color: 'yellow'
      },
      {
        product_id: product.id,
        image_url: 'trapnharmony/collection_001/gods/GodsDontSleep-Yellow-Back.jpg',
        alt_text: "Gods Don't Sleep Tee - Yellow - Back",
        is_primary: false,
        sort_order: 2,
        variant_color: 'yellow'
      }
    ]

    // Insert new organized images
    const { data: newImages, error: insertError } = await supabase
      .from('product_images')
      .insert(variantImages)
      .select()

    if (insertError) {
      console.error('Error inserting new images:', insertError)
      return
    }

    console.log('Successfully updated product images:', newImages.length, 'images created')

    // Optionally, also update product_variants to ensure they have the correct data
    const variants = [
      { color: 'black', name: 'Midnight Black', sku: 'GODS-DONT-SLEEP-BLACK-001' },
      { color: 'white', name: 'Pure White', sku: 'GODS-DONT-SLEEP-WHITE-001' },
      { color: 'red', name: 'Sacred Red', sku: 'GODS-DONT-SLEEP-RED-001' },
      { color: 'yellow', name: 'Divine Gold', sku: 'GODS-DONT-SLEEP-YELLOW-001' }
    ]

    for (const variant of variants) {
      const { error: variantError } = await supabase
        .from('product_variants')
        .upsert({
          product_id: product.id,
          name: variant.name,
          sku: variant.sku,
          color: variant.color,
          price: 49.99,
          stock_quantity: 50,
          is_active: true
        })

      if (variantError) {
        console.error(`Error updating variant ${variant.color}:`, variantError)
      }
    }

    console.log('Database update completed successfully!')

  } catch (error) {
    console.error('Script error:', error)
  }
}

// Run the script
updateProductImages()
