<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Ticket::select('id','transDate','transTime','status','priority','complexity','description','tipo','solicitante','asignado','responsable','incidenteId')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'id'=>'required',
            'transDate'=>'required',
            'transTime'=>'required',
            'status'=>'required',
            'priority'=>'required',
            'complexity'=>'required',
            'description'=>'required',
            'tipo'=>'required',
            'solicitante'=>'required',
            //'asignado'=>'required',
            'responsable'=>'required',
            //'incidenteId'=>'required'
        ]);

        Ticket::create($request->post());

        return response()->json([
            'message'=>'Ticket Created Successfully!!'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function show(Ticket $ticket)
    {
        return response()->json([
            'ticket'=>$ticket
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ticket $ticket)
    {
        $request->validate([
            'id'=>'required',
            'transDate'=>'required',
            'transTime'=>'required',
            'status'=>'required',
            'priority'=>'required',
            'complexity'=>'required',
            'description'=>'required',
            'tipo'=>'required',
            'solicitante'=>'required',
            //'asignado'=>'required',
            'responsable'=>'required',
            //'incidenteId'=>'required'
        ]);

        try{

            $ticket->fill($request->post())->update();

            return response()->json([
                'message'=>'Ticket Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a ticket!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ticket $ticket)
    {
        try {
            /*
            if($product->image){
                $exists = Storage::disk('public')->exists("product/image/{$product->image}");
                if($exists){
                    Storage::disk('public')->delete("product/image/{$product->image}");
                }
            }
            */
            $ticket->delete();

            return response()->json([
                'message'=>'Ticket Deleted Successfully!!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a ticket!!'
            ]);
        }
    }
}
