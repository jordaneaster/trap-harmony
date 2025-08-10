import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/router'
import { getCollectionProducts } from '../../lib/collectionService'
import GodsCollectionHero from '../../components/heroes/GodsCollectionHero'
import MiddleHero from '../../components/heroes/MiddleHero'
import AllProducts from '../../components/products/AllProducts'
import Subscribe from '../../components/ui/Subscribe'

export default function GodsCollectionPage() {
  const router = useRouter()
  const [collection, setCollection] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentColorIndex, setCurrentColorIndex] = useState(0)
  const [showPromoPopup, setShowPromoPopup] = useState(false)
  const sacredVariantsRef = useRef(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const { collection: collectionData, products: productsData } = await getCollectionProducts('gods')
        
        setCollection(collectionData)
        setProducts(productsData)
        
        console.log('Collection loaded with variants:', collectionData?.variants?.length || 0)
        
        // Show promo popup after a short delay when collection loads
        setTimeout(() => {
          setShowPromoPopup(true)
        }, 2000)
        
      } catch (error) {
        console.error('Error fetching gods collection:', error)
        setCollection({
          hero_config: {
            title: 'GODS DON\'T SLEEP',
            subtitle: 'Sacred Geometry Collection',
            description: 'Experience the mystical power of the all-seeing eye through premium streetwear.',
            ctaText: 'STAY VIGILANT',
            features: ['Premium Cotton', 'Sacred Design', 'Limited Edition', 'Sustainable']
          },
          variants: []
        })
        
        // Still show popup even if collection fails to load
        setTimeout(() => {
          setShowPromoPopup(true)
        }, 2000)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const colorVariations = useMemo(() => {
    if (!collection?.variants || collection.variants.length === 0) {
      console.log('No variants found in collection')
      return []
    }
    console.log('Using variants from collection:', collection.variants.map(v => v.variantColor))
    return collection.variants
  }, [collection])

  const nextColor = () => {
    if (colorVariations.length === 0) return
    setCurrentColorIndex((prev) => (prev + 1) % colorVariations.length)
  }

  const prevColor = () => {
    if (colorVariations.length === 0) return
    setCurrentColorIndex((prev) => (prev - 1 + colorVariations.length) % colorVariations.length)
  }

  const handleVariantClick = (variation) => {
    router.push(`/product/${variation.productSlug}?color=${variation.variantColor}&variant=${variation.sku}`)
  }

  const scrollToSacredVariants = () => {
    sacredVariantsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  const handleVariantSwipe = (event, info) => {
    const threshold = 30
    if (info.offset.x > threshold) {
      prevColor()
    } else if (info.offset.x < -threshold) {
      nextColor()
    }
  }

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
          <div className="text-center px-4">
            <div className="text-red-400 text-lg md:text-xl font-poppins mb-4">Loading Gods Collection...</div>
          </div>
        </div>
    )
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Top Hero Section */}
      <GodsCollectionHero 
        heroConfig={collection?.hero_config} 
        onCtaClick={scrollToSacredVariants}
      />
      
      {/* Featured Sacred Variants Casket Section */}


      {/* Middle Hero Section */}
      <MiddleHero />

      {/* All Products Section */}
      {/* <AllProducts products={products} /> */}

      {/* Subscribe Section */}
      <div className="mt-8 md:mt-16">
        <Subscribe />
      </div>
    </div>
  )
}