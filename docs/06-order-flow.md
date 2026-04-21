# Order Lifecycle

## Status Flow

PENDING → CONFIRMED → PREPARING → READY → DELIVERED  
PENDING → CANCELLED  

---

## Role Permissions

### Customer
- Create order
- Cancel order (only PENDING)

### Provider
- Confirm order
- Update status through lifecycle

### Admin
- Override if needed

---

## Important Rules

- No skipping states
- No invalid transitions
- Status must be validated in backend