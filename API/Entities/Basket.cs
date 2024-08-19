using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId {get; set;}
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        public void AddItem(Product product, int quantitty)
        {
            if(Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem
                {
                    ProductId = product.Id,
                    Product = product
                });
            }
            var existingItem = Items.FirstOrDefault(x => x.ProductId == product.Id);
            if(existingItem != null)
            {
                existingItem.Quantitty += quantitty;
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if(item != null)
            {
                Items.Remove(item);
            }
            item.Quantitty -= quantity;
            if(item.Quantitty == 0)
            {
                Items.Remove(item);
            }
        }
    }
}