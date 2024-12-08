<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class CartController extends Controller
{
    // List all Carts
    public function index(): JsonResponse
    {
        $Carts = Cart::all();
        return response()->json(['data' => $Carts], 200);
    }

    // Add a new Cart
// Add a new Cart
public function store(Request $request)
{
    // Define validation rules
    $rules = [
        'product_id' => 'required|integer|min:0',
        'barcode' => 'required|unique:cart,barcode',
        'name' => 'required|unique:cart,name',
        'price' => 'required|numeric|min:0',
        'quantity' => 'required|integer|min:0',
        'category' => 'nullable|string|max:255',
        'description' => 'nullable|string',
    ];

    // Validate the incoming request data
    $validatedData = $request->validate($rules);

    // Create a new Cart instance and save it
    $Cart = new Cart($validatedData);

    // Attempt to save the Cart and handle any exceptions
    if ($Cart->save()) {
        // Return a success response
        return response()->json(['message' => 'Cart created successfully', 'data' => $Cart], 201);
    }

    // Return a server error if something went wrong
    return response()->json(['error' => 'Server error: Unable to create cart'], 500);
}

    

    // Get details of a single Cart
    public function show(int $id): JsonResponse
    {
        $Cart = Cart::findOrFail($id);

        if (!$Cart) {
            return response()->json(['error' => 'Cart not found'], 404);
        }

        return response()->json(['data' => $Cart], 200);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        try {
            // Find the cart item by ID
            $cartItem = Cart::findOrFail($id);
    
            // Validate the incoming request data
            $validatedData = $this->validateUpdateRequest($request);
    
            // Update the quantity of the cart item
            $cartItem->quantity = $validatedData['quantity'];
            $cartItem->save();
    
            // Return a success response
            return response()->json(['message' => 'Cart item updated successfully', 'data' => $cartItem], 200);
        } catch (ModelNotFoundException $e) {
            // Return a not found response if the cart item does not exist
            return response()->json(['error' => 'Cart item not found'], 404);
        } catch (\Exception $e) {
            // Return a server error for any other exceptions
            return response()->json(['error' => 'Server error: ' . $e->getMessage()], 500);
        }
    }
    
    // Separate method for validation
    private function validateUpdateRequest(Request $request): array
    {
        return $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);
    }
    

    // Delete a Cart
    public function destroy(int $id): JsonResponse
    {
        $Cart = Cart::findOrFail($id);

        if (!$Cart) {
            return response()->json(['error' => 'Cart not found'], 404);
        }

        $Cart->delete();
        return response()->json(['message' => 'Cart deleted successfully'], 200);
    }
    
 // Destroy all Carts (Clear the cart)
 public function destroyAll(): JsonResponse
{
    // Delete all Carts
    Cart::query()->delete();

    return response()->json(['message' => 'All Carts have been deleted successfully'], 200);
}
}