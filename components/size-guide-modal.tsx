"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, Ruler, Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
  productType?: "skincare" | "haircare" | "bodycare"
}

export function SizeGuideModal({ isOpen, onClose, productType = "skincare" }: SizeGuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-background border border-border rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-background z-10 p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Ruler className="w-5 h-5 text-[#C9A227]" />
                <h2 className="text-xl font-serif text-foreground">Product Size Guide</h2>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <Tabs defaultValue="skincare">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="skincare">Skincare</TabsTrigger>
                  <TabsTrigger value="haircare">Hair Care</TabsTrigger>
                  <TabsTrigger value="bodycare">Body Care</TabsTrigger>
                </TabsList>

                <TabsContent value="skincare" className="space-y-6">
                  <div className="bg-[#C9A227]/5 border border-[#C9A227]/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">
                        Our skincare products come in various sizes to suit your needs. Travel sizes are perfect for
                        trying new products, while full sizes offer the best value.
                      </p>
                    </div>
                  </div>

                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-medium text-foreground">Size</th>
                        <th className="text-left py-3 font-medium text-foreground">Volume</th>
                        <th className="text-left py-3 font-medium text-foreground">Lasts Approx.</th>
                        <th className="text-left py-3 font-medium text-foreground">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="py-3 text-foreground">Travel</td>
                        <td className="py-3 text-muted-foreground">15ml / 0.5 oz</td>
                        <td className="py-3 text-muted-foreground">2-3 weeks</td>
                        <td className="py-3 text-muted-foreground">Trial / Travel</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-foreground">Mini</td>
                        <td className="py-3 text-muted-foreground">30ml / 1 oz</td>
                        <td className="py-3 text-muted-foreground">4-6 weeks</td>
                        <td className="py-3 text-muted-foreground">Testing / Gifting</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-foreground">Standard</td>
                        <td className="py-3 text-muted-foreground">50ml / 1.7 oz</td>
                        <td className="py-3 text-muted-foreground">2-3 months</td>
                        <td className="py-3 text-muted-foreground">Regular Use</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-foreground">Value</td>
                        <td className="py-3 text-muted-foreground">100ml / 3.4 oz</td>
                        <td className="py-3 text-muted-foreground">4-6 months</td>
                        <td className="py-3 text-muted-foreground">Best Value</td>
                      </tr>
                    </tbody>
                  </table>
                </TabsContent>

                <TabsContent value="haircare" className="space-y-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-medium text-foreground">Size</th>
                        <th className="text-left py-3 font-medium text-foreground">Volume</th>
                        <th className="text-left py-3 font-medium text-foreground">Lasts Approx.</th>
                        <th className="text-left py-3 font-medium text-foreground">Hair Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="py-3 text-foreground">Travel</td>
                        <td className="py-3 text-muted-foreground">50ml / 1.7 oz</td>
                        <td className="py-3 text-muted-foreground">1-2 weeks</td>
                        <td className="py-3 text-muted-foreground">All lengths</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-foreground">Standard</td>
                        <td className="py-3 text-muted-foreground">250ml / 8.5 oz</td>
                        <td className="py-3 text-muted-foreground">6-8 weeks</td>
                        <td className="py-3 text-muted-foreground">Short-Medium</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-foreground">Large</td>
                        <td className="py-3 text-muted-foreground">500ml / 16.9 oz</td>
                        <td className="py-3 text-muted-foreground">3-4 months</td>
                        <td className="py-3 text-muted-foreground">Long / Thick</td>
                      </tr>
                    </tbody>
                  </table>
                </TabsContent>

                <TabsContent value="bodycare" className="space-y-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-medium text-foreground">Size</th>
                        <th className="text-left py-3 font-medium text-foreground">Volume</th>
                        <th className="text-left py-3 font-medium text-foreground">Lasts Approx.</th>
                        <th className="text-left py-3 font-medium text-foreground">Usage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="py-3 text-foreground">Travel</td>
                        <td className="py-3 text-muted-foreground">100ml / 3.4 oz</td>
                        <td className="py-3 text-muted-foreground">1-2 weeks</td>
                        <td className="py-3 text-muted-foreground">TSA Approved</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-foreground">Standard</td>
                        <td className="py-3 text-muted-foreground">250ml / 8.5 oz</td>
                        <td className="py-3 text-muted-foreground">4-6 weeks</td>
                        <td className="py-3 text-muted-foreground">Daily Use</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-foreground">Family</td>
                        <td className="py-3 text-muted-foreground">500ml / 16.9 oz</td>
                        <td className="py-3 text-muted-foreground">2-3 months</td>
                        <td className="py-3 text-muted-foreground">Best Value</td>
                      </tr>
                    </tbody>
                  </table>
                </TabsContent>
              </Tabs>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-medium text-foreground mb-3">Application Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use a pea-sized amount for face serums and treatments</li>
                  <li>• A quarter-sized amount is ideal for face moisturizers</li>
                  <li>• For body products, use enough to cover each area without excess</li>
                  <li>• Always start with less - you can add more if needed</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
